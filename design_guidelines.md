# Design Guidelines: Stellar Account Sequence Checker

## Design Approach
**Selected Approach**: Design System (Material Design) + Blockchain Interface Patterns

**Justification**: This is a utility-focused blockchain application where clarity, reliability, and immediate feedback are critical. Drawing from Material Design's strong feedback mechanisms combined with established crypto interface patterns (Uniswap, MetaMask, Stellar Dashboard).

**Key Principles**:
- Immediate visual feedback for all blockchain interactions
- Clear state indication (connected/disconnected, pending/success/error)
- Minimal cognitive load with focused task flows
- Trust through professional, data-focused presentation

---

## Typography

**Font Stack**: 
- Primary: Inter (Google Fonts) - Clean, technical, excellent for data
- Monospace: JetBrains Mono - For addresses, hashes, sequence numbers

**Hierarchy**:
- H1: 2.5rem (40px), font-weight 700 - Main page title
- H2: 1.875rem (30px), font-weight 600 - Section headers
- H3: 1.25rem (20px), font-weight 600 - Card titles
- Body: 1rem (16px), font-weight 400 - General content
- Small: 0.875rem (14px), font-weight 400 - Labels, metadata
- Monospace data: 0.875rem (14px), font-weight 500 - Addresses, numbers

---

## Layout System

**Spacing Scale**: Use Tailwind units of **2, 4, 6, 8, 12, 16** for consistency
- Component padding: p-6 or p-8
- Section spacing: mb-8 or mb-12
- Tight spacing: gap-2 or gap-4
- Generous spacing: gap-6 or gap-8

**Container Strategy**:
- Max width: max-w-6xl for main content
- Single column layout on mobile, strategic 2-column on desktop
- Centered container with mx-auto

**Grid Usage**:
- Desktop: 2-column for main actions (left: form, right: results)
- Mobile: Stack to single column
- Card grids: grid-cols-1 md:grid-cols-2 for function cards

---

## Component Library

### Core Structure Components

**Header/Navigation**:
- Fixed top navigation bar with site title/logo on left
- Wallet connection button on right (shows address when connected)
- Network selector dropdown (Testnet/Mainnet)
- Height: h-16, with subtle bottom border

**Main Container**:
- Centered max-w-6xl with px-4 md:px-8
- py-8 top spacing below header

**Function Cards**:
- Rounded containers (rounded-lg) with elevation shadow
- Padding: p-6
- Each card contains: icon, title (H3), description, action form
- Use grid layout for 3 main functions: Store, Retrieve, Remove

### Form Elements

**Input Fields**:
- Full-width inputs with clear labels above
- Height: h-12 for comfortable touch targets
- Rounded: rounded-md
- Include placeholder text for guidance
- Monospace font for sequence numbers and addresses
- Label + input + helper text pattern

**Buttons**:
- Primary action: Large, rounded-md, px-6 py-3, font-weight 600
- Secondary action: Outlined variant with same sizing
- Disabled state: Reduced opacity when wallet not connected
- Loading state: Include spinner icon during transactions

### Data Display

**Sequence Record Cards**:
- Display retrieved data in structured cards
- Grid layout: Label (left) | Value (right, monospace)
- Include: Account Address, Sequence Number, Last Updated timestamp
- Padding: p-4 within card sections

**Status Indicators**:
- Wallet connection: Icon + "Connected" or "Not Connected" text
- Transaction status: Icon + status text (Pending/Success/Error)
- Position in top-right of relevant sections

### Feedback Components

**Toast Notifications**:
- Position: Fixed top-right (top-4 right-4)
- Types: Success, Error, Info
- Auto-dismiss after 5 seconds
- Include relevant transaction hash for successful operations
- Monospace font for hashes with truncation

**Loading States**:
- Skeleton screens for data loading
- Spinner overlays during transaction submission
- Disabled state for buttons during operations

### Specialized Components

**Network Selector**:
- Dropdown in header
- Shows current network with indicator dot
- Options: Stellar Testnet, Stellar Mainnet

**Contract Configuration Panel**:
- Collapsible section for advanced users
- Input field for contract address (monospace)
- Save/Update button
- Helper text explaining purpose

**Transaction History List** (Future enhancement):
- Chronological list with timestamp
- Each entry shows: operation type, timestamp, transaction link
- Compact list item design with dividers

---

## Images

**No Hero Image Required**: This is a utility application focused on blockchain interactions. No marketing imagery needed.

**Icons Only**:
- Use Heroicons (outline style) via CDN
- Key icons needed: wallet, refresh, trash, check-circle, x-circle, information-circle
- Icon size: h-5 w-5 for inline, h-6 w-6 for standalone

---

## Accessibility

- All form inputs have associated labels (not just placeholders)
- Focus states clearly visible on all interactive elements
- Error messages announced and associated with inputs
- Keyboard navigation fully supported
- Loading states communicated to screen readers

---

## Animations

**Minimal and Purposeful**:
- Toast slide-in from right (200ms ease-out)
- Button loading spinner rotation
- Transition property on hover states (150ms)
- No decorative or scroll-triggered animations

---

## Page Structure

**Single Page Application Layout**:

1. **Header** (fixed, h-16)
2. **Hero Section** (py-12):
   - H1 title: "Account Sequence Number Checker"
   - Subtitle describing purpose
   - Wallet connection status display
3. **Function Cards Grid** (py-8):
   - 3 cards in grid (responsive)
   - Store Sequence | Retrieve Sequence | Remove Record
4. **Results Display Section** (py-8):
   - Shows when data retrieved
   - Structured data presentation
5. **Footer** (py-6):
   - Contract address display
   - Network information
   - Documentation link