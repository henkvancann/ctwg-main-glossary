[[def: blockchain]]:

~ A [[ref: distributed digital ledger]] of cryptographically-signed transactions that are grouped into blocks. Each block is cryptographically linked to the previous one (making it tamper evident) after [[ref: validation]] and undergoing a consensus decision. As new blocks are added, older blocks become more difficult to modify (creating [[ref: tamper resistance]]). New blocks are replicated across copies of the ledger within the network, and any conflicts are resolved automatically using established rules.

~ Source: [NIST-CSRC](https://csrc.nist.gov/glossary/term/blockchain)

~ Supporting definitions:

~ [Wikipedia:](https://en.wikipedia.org/wiki/Blockchain) A [distributed ledger](https://en.wikipedia.org/wiki/Distributed_ledger) with growing lists of [records](https://en.wikipedia.org/wiki/Record_\(computer_science\)) (blocks) that are securely linked together via [cryptographic hashes](https://en.wikipedia.org/wiki/Cryptographic_hash_function). Each block contains a cryptographic hash of the previous block, a [timestamp](https://en.wikipedia.org/wiki/Trusted_timestamping), and transaction data (generally represented as a [Merkle tree](https://en.wikipedia.org/wiki/Merkle_tree), where [data nodes](https://en.wikipedia.org/wiki/Node_\(computer_science\)) are represented by leaves). Since each block contains information about the previous block, they effectively form a chain (compare [linked list](https://en.wikipedia.org/wiki/Linked_list) data structure), with each additional block linking to the ones before it. Consequently, blockchain transactions are irreversible in that, once they are recorded, the data in any given block cannot be altered retroactively without altering all subsequent blocks.

