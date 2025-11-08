use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use actix_cors::Cors;
use serde::{Deserialize, Serialize};

mod stellar;

#[derive(Debug, Deserialize)]
struct SequenceRequest {
    account_id: String,
    network: String,
}

#[derive(Debug, Serialize)]
struct SequenceResponse {
    account_id: String,
    sequence: String,
    network: String,
}

#[derive(Debug, Serialize)]
struct ErrorResponse {
    error: String,
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("Starting Stellar Sequence Checker API on 0.0.0.0:3000");

    HttpServer::new(|| {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header()
            .max_age(3600);

        App::new()
            .wrap(cors)
            .route("/api/health", web::get().to(health_check))
            .route("/api/sequence", web::post().to(get_sequence))
    })
    .bind(("0.0.0.0", 3000))?
    .run()
    .await
}

async fn health_check() -> impl Responder {
    HttpResponse::Ok().json(serde_json::json!({
        "status": "ok",
        "service": "stellar-sequence-checker",
        "version": "0.1.0"
    }))
}

async fn get_sequence(req: web::Json<SequenceRequest>) -> impl Responder {
    let network = match req.network.to_lowercase().as_str() {
        "testnet" => stellar::Network::Testnet,
        "mainnet" => stellar::Network::Mainnet,
        _ => {
            return HttpResponse::BadRequest().json(ErrorResponse {
                error: format!("Invalid network: {}. Must be 'testnet' or 'mainnet'", req.network),
            });
        }
    };

    match stellar::query_stellar_horizon(&req.account_id, network) {
        Ok(account_response) => {
            HttpResponse::Ok().json(SequenceResponse {
                account_id: account_response.account_id,
                sequence: account_response.sequence,
                network: req.network.clone(),
            })
        }
        Err(e) => {
            HttpResponse::BadRequest().json(ErrorResponse {
                error: format!("Failed to fetch account: {}", e),
            })
        }
    }
}
