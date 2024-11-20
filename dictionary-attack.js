const crypto = require('crypto');
const fs = require('fs');

// The target MD5 hash
const targetHash = '578ed5a4eecf5a15803abdc49f6152d6';

// Function to perform a dictionary attack
function dictionaryAttack() {
    // Load the dictionary file (500 worst passwords list)
    fs.readFile('500-worst-passwords.txt', 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading file:', err);
            return;
        }

        // Split the file into individual words (passwords)
        const passwords = data.split('\n');

        // Iterate through each password
        for (let password of passwords) {
            // Trim any leading/trailing whitespace
            password = password.trim();

            // Compute the MD5 hash of the current password
            const hash = crypto.createHash('md5').update(password).digest('hex');

            // Check if the hash matches the target hash
            if (hash === targetHash) {
                console.log(`Bob's password is: ${password}`);
                return;
            }
        }

        console.log('Password not found in dictionary.');
    });
}

// Run the dictionary attack
dictionaryAttack();
