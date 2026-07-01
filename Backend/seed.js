import mongoose from "mongoose";
import dotenv from "dotenv";
import Post from "./Models/PostSchema.js";

dotenv.config({ path: "./config.env" });

const PROJECTS = [
    {
        id: "melbourne-city-sector-ii",
        name: "Melbourne City Sector II",
        slug: "melbourne-city-sector-ii",
        type: "plot",
        location: "Kaldongri, Nagpur",
        description: "A thoughtfully planned premium residential development spread across 4 acres featuring 71 residential plots. Designed for families and investors seeking long-term growth and peaceful living in Nagpur's fastest-growing corridor.",
        details: [
            "Spread across 4 acres of lush greenery",
            "Fully sanctioned by Nagpur Metropolitan Region Development Authority (NMRDA)",
            "A peaceful gated community with premium features",
            "Ready for immediate construction with excellent immediate appreciation prospects",
        ],
        specs: [
            { label: "Project Area", value: "4 Acres" },
            { label: "Total Plots", value: "71 Residential Plots" },
            { label: "Plot Sizes", value: "1,200 - 3,500 Sq. Ft." },
            { label: "Bank Loan", value: "Up to 80% Approved" },
            { label: "Development Authority", value: "NMRDA Sanctioned RL" },
        ],
        highlights: ["71 Premium Residential Plots", "4 Acre Masterplanned Development", "Curated Lifestyle Amenities", "High-potential Investment Corridor"],
        amenities: ["European Style Entrance Gate", "Landscaped Gardens", "Children's Play Area", "Jogging Track", "Wide Paved Roads", "Sewerage Treatment Plant", "Underground Electrical Cables", "LED Street Lighting"],
        acres: "4",
        totalUnits: "71",
        priceRange: "₹22 Lakh onward",
        image: "/images/project_melbourne_png_1780484693295.png",
        gallery: ["/images/project_melbourne_png_1780484693295.png", "/images/heroimage.png"],
        coordinate: { x: 38, y: 72 },
        mapHotspot: "Kaldongri Highway Hub",
    },
    {
        id: "canberra-city",
        name: "Canberra City",
        slug: "canberra-city",
        type: "plot",
        location: "Wardha Road Corridor, Nagpur",
        description: "Spread across 6 premium acres with 97 residential plots, Canberra City combines ultra-modern infrastructure, wide-open spaces, and incredible geographical layout advantages.",
        details: [
            "6 acres of perfectly flat, premium elevated topography",
            "Includes open public utility spaces and landscaped parks",
            "Complete concrete/tar roads with direct access to national arterial highways",
            "Water connections directly running to every individual plot boundary",
        ],
        specs: [
            { label: "Project Area", value: "6 Acres" },
            { label: "Total Plots", value: "97 Residential Plots" },
            { label: "Internal Roads", value: "30 & 40 feet wide layout" },
            { label: "Bank Loan Support", value: "Up to 80% Assistance" },
            { label: "Clear Title", value: "100% Fully RL Approved" },
        ],
        highlights: ["97 Highly Appreciating Residential Plots", "6 Acre Premium Layout Planning", "Green Open Spaces & Gazebos", "Immediate Electricity Infrastructure"],
        amenities: ["European Style Entrance Gate", "Lush Landscaped Gazette Parks", "Gazebos & Outdoor Seating Blocks", "Broad Walking & Jogging Tracks", "Wide Drainage & Storm Water Systems", "Round-the-clock Security Hub", "Avenue Plantations"],
        acres: "6",
        totalUnits: "97",
        priceRange: "₹30 Lakh onward",
        image: "/images/project_canberra_png_1780484709897.png",
        gallery: ["/images/project_canberra_png_1780484709897.png", "/images/heroimage.png"],
        coordinate: { x: 25, y: 58 },
        mapHotspot: "Wardha Road Smart Belt",
    },
    {
        id: "shraddha-bhakti-avenue",
        name: "Shraddha Bhakti Avenue",
        slug: "shraddha-bhakti-avenue",
        type: "apartment",
        location: "Besa, Nagpur",
        description: "Experience premium luxury living with spacious 3 BHK boutique residences designed for modern elite families seeking ultimate privacy, supreme ventilation, and structural perfection.",
        details: [
            "Stately 1-block boutique, premium low-density development",
            "7 storeys of meticulously planned structures maximizing daylight",
            "Super built-up area of 2,106 square feet with elegant balconies",
            "Centrally located with super-fast highway and metro connectivity",
        ],
        specs: [
            { label: "Configuration", value: "Luxury 3 BHK" },
            { label: "Super Built-Up Area", value: "2,106 Sq. Ft." },
            { label: "Building Structure", value: "7 Storeys (Premium Block)" },
            { label: "Total Units", value: "28 Exclusive Homes" },
            { label: "Approval Status", value: "RERA Registered & NMRDA Approved" },
        ],
        highlights: ["2106 Sq. Ft. Singular Opulent 3 BHK Layouts", "High-end 7-Storey Iconic Elevation", "Besa Prime Residential Coordinates", "Dedicated Reserved Double Car Parking"],
        amenities: ["High-speed Branded Elevator", "Rooftop Executive Lounge Garden", "Kids Play Area with rubberized floor", "100% DG Back-up for Common Areas", "Rainwater Harvesting System", "Integrated Multi-tier Firefighting Grid", "Sleek Vitrified Tile Floorings"],
        acres: "Boutique Project",
        totalUnits: "28",
        priceRange: "₹85 Lakh onward",
        image: "/images/project_shraddha_png_1780484729700.png",
        gallery: ["/images/project_shraddha_png_1780484729700.png", "/images/heroimage.png"],
        coordinate: { x: 52, y: 40 },
        mapHotspot: "Besa Square Premium Belt",
    },
    {
        id: "kharsoli-township",
        name: "Kharsoli Township Project",
        slug: "kharsoli-township",
        type: "upcoming",
        location: "Kharsoli, Nagpur",
        description: "[UPCOMING] A massive, master-planned residential township spread across 9 high-growth acres featuring 126 state-of-the-art residential plots.",
        details: [
            "Grand township development encompassing 9 sprawling green acres",
            "Features a highly modern road grid, smart fiber-ready planning",
            "Slated to include dedicated charging hubs and smart parking structures",
        ],
        specs: [
            { label: "Project Status", value: "Upcoming Project Launch" },
            { label: "Development Size", value: "9 Sprawling Acres" },
            { label: "Total Plots Planned", value: "126 Residential Plots" },
            { label: "Target Launch", value: "Q4 2026" },
        ],
        highlights: ["9-Acre Futuristic Gated Eco-System", "126 Smart Residential High-Value Plots", "Extremely Wide 40ft/50ft Internal Road Systems", "Hyper-growth Potential Near Major Ring Roads"],
        amenities: ["Central Amphi-theatre Park", "Jogging Tracks and Outdoor Gym", "Advanced Water Harvesting Grid", "Commercial Retail Convenience Plaza Block"],
        acres: "9",
        totalUnits: "126",
        priceRange: "Pricing Released Upon Launch",
        image: "/images/heroimage.png",
        gallery: ["/images/heroimage.png"],
        coordinate: { x: 70, y: 35 },
        mapHotspot: "Kharsoli Growth Zone",
    },
    {
        id: "mega-township",
        name: "Mega Township Project",
        slug: "mega-township",
        type: "upcoming",
        location: "Outer Ring Road Belt, Nagpur",
        description: "[UPCOMING MEGA PROJECT] An iconic, landmark city-scale township spread across 60+ mammoth acres, crafted to host more than 1000 residential plots.",
        details: [
            "Nagpur's biggest upcoming integrated township project",
            "60+ acres incorporating integrated educational, retail, and hospitality spaces",
            "Expected to become one of the fastest appreciating clusters in central India",
        ],
        specs: [
            { label: "Project Scale", value: "60+ Acres Super-Township" },
            { label: "Total Plots Planned", value: "1000+ Plots" },
            { label: "Amenities Provided", value: "35+ Integrated Facilities" },
            { label: "Launch Phase", value: "Pre-launch registration open" },
        ],
        highlights: ["60+ Acre Gated Integrated City Layout", "1000+ Residential Plots with diverse size options", "Expansive Central Theme Parks & Mini Lakes", "Superior Investment Value and Tier-1 Security"],
        amenities: ["Ultra Luxury Multi-storey Grand Clubhouse", "State-of-the-Art Sports Arenas & Cricket Nets", "Swimming Pools and Health Care Outlets", "Integrated Educational Center Block"],
        acres: "60+",
        totalUnits: "1000+",
        priceRange: "Special Pre-launch rates on request",
        image: "/images/heroimage.png",
        gallery: ["/images/heroimage.png"],
        coordinate: { x: 80, y: 65 },
        mapHotspot: "Outer Ring Road Tech-Belt",
    },
];

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected.");

        await Post.deleteMany({});
        await Post.insertMany(PROJECTS);
        console.log(`✅ Seeded ${PROJECTS.length} projects successfully.`);
    } catch (error) {
        console.error("Seed error:", error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

seed();
