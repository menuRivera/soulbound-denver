import { parseAbi } from 'viem'

// TODO: Replace with deployed contract address
export const CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000' as const

export const CONTRACT_ABI = parseAbi([
    // Config
    'function maxSupply() view returns (uint256)',
    'function dropEndTime() view returns (uint64)',
    'function onePerWallet() view returns (bool)',
    'function maxMetadataBase64Length() view returns (uint32)',
    'function HARD_CAP_METADATA_B64() view returns (uint32)',

    // State
    'function nextTokenId() view returns (uint256)',
    'function tokenOf(address) view returns (uint256)',
    'function tokenURI(uint256) view returns (string)',

    // Mint
    'function mint(string calldata metadataBase64) returns (uint256)',
    'event Minted(address indexed to, uint256 indexed tokenId, uint256 metadataLen)',

    // Errors
    'error DropEnded()',
    'error SoldOut()',
    'error AlreadyMinted()',
    'error MetadataTooLarge()',
    'error Soulbound()',
])
