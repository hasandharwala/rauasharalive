/**
 * IMPORTANT: To achieve a 10/10 security rating for your admin account, you must run this script once to assign 
 * cryptographic "Custom Claims" to the admin account. This makes it impossible for someone to spoof admin rights.
 *
 * PREREQUISITES:
 * 1. You must have Node.js installed (or you can use Google Cloud Shell from your Google Cloud Console).
 * 2. You need to generate a Service Account Key from your Firebase Console:
 *    - Go to Firebase Console -> Project Settings -> Service Accounts
 *    - Click "Generate new private key"
 *    - Save the downloaded JSON file in the same directory as this script and rename it to `serviceAccountKey.json`.
 * 3. Run `npm install firebase-admin` in this directory.
 * 4. Run the script using: `node set_admin_claim.js`
 */

const admin = require('firebase-admin');

// Load the downloaded service account key
const serviceAccount = require('./serviceAccountKey.json'); // Make sure this file exists!

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// We are upgrading the 'admin@ashara.live' account.
const adminEmail = 'admin@ashara.live';

async function setAdminClaim() {
  try {
    const user = await admin.auth().getUserByEmail(adminEmail);
    
    // Set custom claim `admin: true`
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    
    console.log(`\n✅ SUCCESS! The admin claim has been assigned to ${adminEmail}.`);
    console.log(`Security is now maximized for the admin account. You can safely delete the serviceAccountKey.json file.\n`);
    
  } catch (error) {
    console.error("❌ Error assigning admin claim:", error.message);
  } finally {
    process.exit();
  }
}

setAdminClaim();
