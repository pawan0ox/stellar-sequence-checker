use serde::{Deserialize, Serialize};

const TESTNET_HORIZON_URL: &str = "https://horizon-testnet.stellar.org";
const MAINNET_HORIZON_URL: &str = "https://horizon.stellar.org";

#[derive(Debug, Serialize, Deserialize)]
pub struct AccountResponse {
    pub sequence: String,
    pub account_id: String,
}

pub enum Network {
    Testnet,
    Mainnet,
}

impl Network {
    pub fn horizon_url(&self) -> &str {
        match self {
            Network::Testnet => TESTNET_HORIZON_URL,
            Network::Mainnet => MAINNET_HORIZON_URL,
        }
    }
}

pub fn query_stellar_horizon(
    account_id: &str,
    network: Network,
) -> Result<AccountResponse, Box<dyn std::error::Error>> {
    let horizon_url = network.horizon_url();
    let url = format!("{}/accounts/{}", horizon_url, account_id);

    let response = ureq::get(&url)
        .set("Accept", "application/json")
        .call()?;

    if response.status() != 200 {
        return Err(format!("Failed to fetch account: HTTP {}", response.status()).into());
    }

    let account_data: serde_json::Value = response.into_json()?;
    
    let sequence = account_data["sequence"]
        .as_str()
        .ok_or("Missing sequence field")?
        .to_string();
    
    let account_id = account_data["account_id"]
        .as_str()
        .ok_or("Missing account_id field")?
        .to_string();

    Ok(AccountResponse {
        sequence,
        account_id,
    })
}

pub fn get_sequence_number(account_response: &AccountResponse) -> Result<u64, Box<dyn std::error::Error>> {
    account_response
        .sequence
        .parse::<u64>()
        .map_err(|e| format!("Failed to parse sequence number: {}", e).into())
}
