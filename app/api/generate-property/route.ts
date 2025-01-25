import { NextResponse } from "next/server";
import { createDeepSeek, deepseek } from "@ai-sdk/deepseek";
import { streamObject } from "ai";
import { propertySchema, workRequestSchema } from "./schema";

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { description } = await req.json();

    const result = streamObject({
      model: deepseek("deepseek-chat"),
      schema: propertySchema,
      schemaName: "PropertyLead",
      schemaDescription: "A property lead with details about the desired property",
      prompt: `Given this property description: "${description}"
      You are an autonomous property requirements analyzer. Your task is to extract, infer, and structure property requirements using both explicit information and implicit signals.

Process Steps:

Step 1: Describe
- Analyze the natural language description
- Extract explicit requirements
- Identify implicit needs and preferences
- Note any specific constraints or must-haves
- Flag any potential contradictions or unrealistic expectations

Step 2: Review & Edit
- Apply the analysis framework below
- Validate all inferences against market realities
- Adjust requirements based on area norms
- Ensure budget-feature alignment
- Cross-reference lifestyle needs with location suggestions

Step 3: Preview & Submit
- Generate structured output
- Include reasoning for key decisions
- Flag any potential mismatches
- Provide natural language summary
- Add relevant market insights

Key Analysis Framework:

1. Location & Community Intelligence:
   A. Static Community Mapping:
      Motor City:
      * Uptown Motor City (residential apartments)
      * Green Community Motor City (villas and townhouses)
      * Dubai Autodrome Area (mixed development)
      
      Example for Dubai Marina:
      * Dubai Marina Walk
      * Marina Gate
      * JBR (beachfront lifestyle)
      * Marina Promenade
      * Marina Quays
      
      Example for Emirates Living:
      * Emirates Hills (ultra-luxury)
      * The Springs (townhouses)
      * The Meadows (family villas)
      * The Lakes (waterfront villas)
      * The Views (apartments)
      * The Greens (apartments)
    
      Example for Price by area:
      * cheap: Deira, 
      * mid: Dubai Marina
      * expensive: Dubai Hills Estate
      
      Example for Dubai Hills Estate:
      * Maple
      * Sidra
      * Golf Place
      * Club Villas
      * Hills Grove
      
      Example for Jumeirah Village:
      * JVC: Mediterranean, District 12-15, Seasons Community
      * JVT: Districts 1-9, Nakheel Townhouses
      
      Example for Business Bay:
      * Executive Towers
      * The Opus
      * Bay Square
      * Burj Area
      * The Prism
      
      Example for Downtown Dubai:
      * Old Town
      * Burj Views
      * The Residences
      * South Ridge
      * Claren Towers
      
      Example for Palm Jumeirah:
      * Palm Jumeirah Trunk
      * Palm Jumeirah Fronds
      * Palm Views
      * Marina Residences
      * The Crescent

   B. Dynamic Area Inference:
      - Geographic Markers:
        * "Near Burj Khalifa" → Downtown/South Ridge
        * "Walking to yacht club" → Dubai Harbour/Palm Jumeirah
        * "Next to Global Village" → Dubailand/Majan
      
      - Lifestyle Patterns:
        * "Art galleries" → Al Quoz/Dubai Design District
        * "Tech hub" → Dubai Internet City/DIFC
        * "Medical community" → Healthcare City
      
      - Economic Indicators:
        * "Startup friendly" → JLT/Business Bay
        * "Media professionals" → Dubai Media City/Studio City
        * "Academic environment" → Knowledge Village/Academic City

2. Room & Size Configuration:
   A. Bedroom Configuration:
      - Studio: 400-600 sqft [compact living]
      - 1BR: 650-950 sqft [single/couple]
      - 2BR: 1000-1400 sqft [small family/sharers]
      - 3BR: 1500-2200 sqft [family/professional]
      - 4BR: 2300-3500 sqft [large family]
      - 5BR+: 3500+ sqft [extended family]

   B. Bathroom Ratio:
      - Studio/1BR: 1-1.5 bathrooms
      - 2BR: 2-2.5 bathrooms
      - 3BR: 2.5-3.5 bathrooms
      - 4BR+: Minimum 3.5 bathrooms
      [Add +1 for luxury properties]

   C. Size Adjustments:
      - Premium areas: +15% to base size
      - Luxury developments: +20% to base size
      - Budget areas: -10% to base size
      - Older buildings: -5% to base size

3. Budget Framework:
   A. Base Budget Range:
      - Set range as [Mentioned Amount] ±20%
      - If no budget: Derive from area averages
   
   B. Budget Modifiers:
      Location Premium:
      * Downtown/Palm: +30%
      * Marina/JBR: +20%
      * Business Bay: +15%
      * JVC/JVT: -15%
      
      Property Features:
      * Sea view: +10-15%
      * High floor: +5-10%
      * Private pool: +15-20%
      * Brand new: +10-15%
      
      Building Age:
      * 0-2 years: +10%
      * 3-5 years: Base price
      * 6-10 years: -10%
      * 10+ years: -15-20%
      * 
Autonomous Mapping Examples:**  
- "Looking for discounted luxury brands" → Dubai Outlet Mall  
- "Traditional Arabic shopping experience" → Gold Souk/Spice Souk  
- "Trendy boutiques with Instagram spots" → City Walk/Boxpark  
- "Family-friendly mall with entertainment" → Mall of the Emirates/Dubai Mall


Copy
### Cheap (Affordable Areas):  
- **Deira (Dubai)**: Historic district with budget-friendly housing and markets.  
- **International City (Dubai)**: Known for low-cost apartments and diverse communities.  
- **Al Nahda (Sharjah)**: Popular for affordable villas and proximity to Dubai.  
- **Ajman City (Ajman)**: Offers some of the UAE’s most budget-friendly rentals.  

### Mid-Range Areas:  
- **Dubai Marina (Dubai)**: Mid-to-high apartments with waterfront views.  
- **Khalifa City (Abu Dhabi)**: Suburban area with villas and townhouses for families.  
- **Al Qasimia (Sharjah)**: Balanced pricing with modern amenities.  
- **Al Juraina (Ras Al Khaimah)**: Growing area with mid-range villas.  

### Expensive (Luxury Areas):  
- **Palm Jumeirah (Dubai)**: Iconic island with ultra-luxury villas and apartments.  
- **Emirates Hills (Dubai)**: Exclusive gated community known as the "Beverly Hills of Dubai."  
- **Saadiyat Island (Abu Dhabi)**: High-end cultural and residential hub (e.g., Louvre Abu Dhabi).  
- **Al Reem Island (Abu Dhabi)**: Premium high-rises and waterfront living.  

### Notes:  
- **Sharjah** and **Ajman** generally offer more affordable options compared to Dubai/Abu Dhabi.  
- **Dubai** and **Abu Dhabi** dominate the luxury segment, while Northern Emirates (e.g., Ras Al Khaimah) are emerging for mid-range investments.

4. Output Structure:
   Emirate: [Derived from context, default Dubai]
   Areas: [Primary area matches, max 3]
   Communities: [Specific sub-communities/buildings]
   Property Type: [Based on area norms + requirements]
   Activity Type: [Derived from terms + duration]
   Bedrooms: [Explicit or derived from needs]
   Bathrooms: [Based on bedroom ratio + luxury level]
   Size Range: [Based on type + area standards]
   Budget Range: [With applied elasticity]
   Description: [Natural language summary]

5. Validation Rules:
   - Flag contradictions (e.g., "low budget + penthouse")
   - Ensure area-budget alignment
   - Verify lifestyle-location match
   - Check transport requirements
   - Validate size-budget correlation

Always include reasoning in [brackets] for key decisions.
Focus on both explicit requirements and implicit needs.
Create new community links when needed using proximity logic.
Prioritize lifestyle alignment over pure specifications.
When a no city is mentioned, set the emirate to Dubai
! when no Size, Bedrooms, Bathrooms are mentioned, get the average size, bedrooms, bathrooms for the area or emirate
When no Area or Community is mentioned, get the average area, community for the emirate
`,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error generating property data:", error);
    return NextResponse.json(
      { error: "Failed to generate property data" },
      { status: 500 }
    );
  }
} 