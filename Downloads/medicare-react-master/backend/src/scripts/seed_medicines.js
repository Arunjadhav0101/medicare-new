const db = require('../config/database');

const medicineNames = [
    "Ibuprofen", "Acetaminophen", "Amoxicillin", "Lisinopril", "Levothyroxine",
    "Atorvastatin", "Metformin", "Azithromycin", "Metoprolol", "Albuterol",
    "Omeprazole", "Losartan", "Gabapentin", "Hydrochlorothiazide", "Sertraline",
    "Simvastatin", "Montelukast", "Escitalopram", "Amlodipine", "Furosemide",
    "Pantoprazole", "Prednisone", "Citalopram", "Fluoxetine", "Bupropion",
    "Dextroamphetamine", "Venlafaxine", "Duloxetine", "Tamsulosin", "Meloxicam",
    "Warfarin", "Clopidogrel", "Clonazepam", "Lorazepam", "Alprazolam",
    "Cyclobenzaprine", "Trazodone", "Cymbalta", "Lexapro", "Zoloft",
    "Prozac", "Wellbutrin", "Adderall", "Vyvanse", "Ritalin",
    "Concerta", "Xanax", "Klonopin", "Ativan", "Valium",
    "Lipitor", "Crestor", "Zocor", "Pravachol", "Mevacor",
    "Nexium", "Prevacid", "Prilosec", "Protonix", "Aciphex",
    "Zantac", "Pepcid", "Tagamet", "Axid", "Zofran",
    "Phenergan", "Reglan", "Compazine", "Antivert", "Dramamine",
    "Benadryl", "Zyrtec", "Claritin", "Allegra", "Xyzal",
    "Flonase", "Nasacort", "Rhinocort", "Nasonex", "Sudafed",
    "Mucinex", "Robitussin", "Delsym", "Tylenol", "Advil",
    "Motrin", "Aleve", "Bayer", "Excedrin", "Midol",
    "Pamprin", "Naproxen", "Celebrex", "Mobic", "Voltaren",
    "Lyrica", "Neurontin", "Topamax", "Depakote", "Lamictal",
    "Keppra", "Tegretol", "Trileptal", "Zonegran", "Vimpat"
];

const categories = [
    'Pain Relief', 'Antibiotics', 'Allergy', 'Digestive', 'Diabetes',
    'Vitamins', 'First Aid', 'Cardiovascular', 'Respiratory', 'Mental Health'
];

async function seed() {
    try {
        // Delete old dummy medicines
        await db.query("DELETE FROM medicines WHERE name LIKE 'Medicine %'");

        let values = [];
        for (let i = 0; i < 100; i++) {
            // Use realistic names. If we run out, append a dosage.
            const name = medicineNames[i % medicineNames.length] + (i >= medicineNames.length ? ` ${Math.floor(i / medicineNames.length) * 10}mg` : '');
            const cats = categories[Math.floor(Math.random() * categories.length)];
            const price = Math.floor(Math.random() * 500) + 10;
            const description = `This is a high quality ${cats.toLowerCase()} medication. Useful for treating various conditions.`;
            values.push(`('${name}', ${price}, '${description}', '${cats}', 100)`);
        }

        if (values.length > 0) {
            await db.query(`INSERT INTO medicines (name, price, description, category, stock) VALUES ${values.join(',')}`);
        }
        console.log('100 realistic medicines seeded');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
seed();
