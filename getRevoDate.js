/**
 * Returns the current date in the French Revolutionary Calendar.
 * The French Revolutionary Calendar started on 22 September 1792.
 * Each year has 12 months of 30 days, plus 5 or 6 complementary days.
 */

function getRevoDate() {
    // Revolutionary calendar start date
    const revoStart = new Date(Date.UTC(1792, 8, 22)); // 22 Sept 1792

    // Current date (UTC)
    const now = new Date();
    const today = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));

    // Days since start
    const daysSinceStart = Math.floor((today - revoStart) / (1000 * 60 * 60 * 24));

    // Calculate year
    let year = Math.floor(daysSinceStart / 365.2425) + 1;

    // Calculate day of year
    let dayOfYear = daysSinceStart - Math.floor((year - 1) * 365.2425);

    // Months
    const months = [
        "Vendémiaire", "Brumaire", "Frimaire",
        "Nivôse", "Pluviôse", "Ventôse",
        "Germinal", "Floréal", "Prairial",
        "Messidor", "Thermidor", "Fructidor"
    ];

    let month, day;
    if (dayOfYear < 360) {
        month = months[Math.floor(dayOfYear / 30)];
        day = (dayOfYear % 30) + 1;
    } else {
        month = "Sansculottides";
        day = dayOfYear - 359;
    }

    return {
        year,
        month,
        day
    };
}

// Example usage:
const revoDate = getRevoDate();
console.log(`Aujourd'hui, c'est le ${revoDate.day} ${revoDate.month} An ${revoDate.year} du calendrier révolutionnaire.`);
