const db = require('../config/database');
async function alter() {
    try {
        await db.query("ALTER TABLE orders MODIFY status ENUM('Pending', 'Processing', 'Approved', 'Rejected', 'Completed', 'Delivered') DEFAULT 'Pending'");
        console.log('Orders status enum updated');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
alter();
