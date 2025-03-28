export const WEATHER_TERMINOLOGIES: WeatherTerminology[] = [
  {
    term: "Caution",
    threshold: "27-32°C",
    definition:
      "Fatigue is possible with prolonged exposure and activity. Continuing activity could lead to heat cramps.",
    category: "heatIndex",
  },
  {
    term: "Extreme Caution",
    threshold: "33-41°C",
    definition:
      "Heat cramps and heat exhaustion are possible. continuing activity could lead to heat stroke.",
    category: "heatIndex",
  },
  {
    term: "Danger",
    threshold: "42-51°C",
    definition:
      "Heat cramps and heat exhaustion are likely; heat stroke is probable with continued exposure.",
    category: "heatIndex",
  },
  {
    term: "Extreme Danger",
    threshold: "52°C and beyond",
    definition: "Heat stroke is imminent.",
    category: "heatIndex",
  },
  {
    term: "Light Winds",
    threshold: "19KPH or less",
    definition:
      "Wind felt on face. Ordinary wind vanes moved by wind. Leaves rustle.",
    category: "windSpeed",
  },
  {
    term: "Moderate Winds",
    threshold: "20-29KPH",
    definition: "Wind raises dust and loose paper. Small branches are moved.",
    category: "windSpeed",
  },
  {
    term: "Fresh Winds",
    threshold: "30-39KPH",
    definition:
      "Small trees in leaf begin to sway. Crested wavelets appear on inland waters.",
    category: "windSpeed",
  },
  {
    term: "Strong Winds",
    threshold: "40-50KPH",
    definition:
      "Large branches in motion. Whistling heard in telephone wires. Umbrellas used with difficulty.",
    category: "windSpeed",
  },
  {
    term: "Gale",
    threshold: "51-87KPH",
    definition:
      "Whole trees in motion. Incovenience felt when walking against wind. Twigs break off road. Cars veer on road. Larger brances break off. Slight structural damage occurs-roofing disloged.",
    category: "windSpeed",
  },
  {
    term: "Stormy",
    threshold: "88KPH or more",
    definition:
      "Trees uprooted. Considered structural damage. Widespread damage.",
    category: "windSpeed",
  },
  {
    term: "Light Rains",
    threshold: "2.5mm/h and below",
    definition:
      "Individual drops easily identified and puddles(small muddy pools) form slowly. Small streams may flow in gutters.",
    category: "precipitation",
  },
  {
    term: "Moderate Rains",
    threshold: "2.5-7.5mm/h",
    definition: "Puddles rapidly forming and down pipes flowing freely",
    category: "precipitation",
  },
  {
    term: "Heavy Rains",
    subtitle: "Yellow Rainfall",
    threshold: "7.5-15mmph",
    definition:
      "The sky is overcast, there is a continuous precipitation. Falls in sheets, misty spray over hard surfaces. May cause roaring noise on roofs.",
    category: "precipitation",
  },
  {
    term: "Minimal",
    threshold: "1-2",
    definition:
      "Wear sunglasses on bright days. In winter, reflection off snow can nearly double UV strength. If you burn easily, cover up and use sunscreen.",
    category: "uvIndex",
  },
  {
    term: "Moderate",
    threshold: "3-5",
    definition:
      "Take precautions, such as covering and using sunscreen, if you will be outside. Stay in shade near midday when the sun is strongest.",
    category: "uvIndex",
  },
  {
    term: "High",
    threshold: "6-7",
    definition:
      "Protection against sunburn is needed. Reduce time in the sun between 11 a.m. and 4 p.m. Cover up, wear a hat and sunglasses, and use sunscreen",
    category: "uvIndex",
  },
  {
    term: "Very High",
    threshold: "8-10",
    definition:
      "Take extra precautions. Unprotected skin will be damaged and can burn quickly. Try to avoid the sun between 11 a.m and 4 p.m. Otherwise, seek shade, cover up, wear a hat and sunglasses, and use sunscreen.",
    category: "uvIndex",
  },
  {
    term: "Extreme",
    threshold: "11+",
    definition:
      "Take all precautions. unprotected skin can burn in minutes. Beachgoers should know that white sand and other bright surfaces reflect UV and will increase UV exposure. Avoid the sun between 11 a.m and 4 p.m. Seek shade, cover up, wear a hat and sunglasses, and use sunscreen.",
    category: "uvIndex",
  },
  {
    term: "Tropical Depression",
    subtitle: "Wind Signal 1",
    threshold: "39-61KPH",
    definition: `<strong>Potential Impacts:</strong> House of poor construction (e.g., wood frame, bamboo, makeshift), old dilapidated structures, and other structures made of light materials will suffer minimal to minor damage. Some banana and similar plants are tilted, while twigs of small trees may sway with the wind. Rice crops, especially those in flowering and ripening stages, may suffer some damage. Minimal disruption to public transportation.`,
    category: "windSpeed",
    leadTime: "36 Hours",
    subcategory: "cyclone",
  },
  {
    term: "Tropical Storm",
    subtitle: "Wind Signal 2",
    threshold: "62-88KPH",
    definition: `<strong>Potential Impacts:</strong> Minor to moderate damage may occur to makeshift or old dilapidated structures, and other structures made of light materials. Houses of poor and average construction (e.g., unreinforced CHB/masonry, mixed timber-CHB) may receive minor roof damage. Unsecures, exposed lightweight items may become projectiles which may cause additional damage. Some electrical wires may be blown down, resulting in local power outages. Minor to moderate disruption to public transportation. Most banana and similar plants are tilted, with some stooped or downed. Some small trees blow over, with twigs and branches of frail trees broken. Considerable damage is likely to rice and other similar crops, especially those in flowering and ripening stages.`,
    category: "windSpeed",
    leadTime: "24 Hours",
    subcategory: "cyclone",
  },
  {
    term: "Severe Tropical Storm",
    subtitle: "Wind Signal 3",
    threshold: "89-117KPH",
    definition: `<strong>Potential Impacts:</strong>
    Makeshift or old, dilapidated structures, and other structures made of light materials may suffer substantial damage. Houses of poor or average construction will have considerate roof damage, some blown-out windows, and/or partial wall damage. Well-constructed houses (e.g., reinforced/pre-cast CHB, reinforced concrete moment frame) may suffer minimal to minor roof damage.
    Warehouses and other buildings in industrial parks may suffer minor to moderate damage.
    Unsecured, exposed outdoor items of light to moderate weight may become projectiles, causing additional damage or injuries.
    Many areas may suffer power outages with numerous downed power lines ans posts. Minimal to minor disruption in telecommunications and potable water suppy.
    Moderate to significant disruption to public transportation
    Some small trees. most banana and similar plants, and a few large trees are downed or broken. Rice and other similar crops, especially those in flowering and ripening stages may suffer heavy damage.
`,
    category: "windSpeed",
    leadTime: "18 Hours",
    subcategory: "cyclone",
  },
  {
    term: "Typhoon",
    subtitle: "Wind Signal 4",
    threshold: "118-184KPH",
    definition: `<strong>Potential Impacts:</strong>
    Severe damage will occur to makeshift or old, dilapidated of light structures, and other structures made of light materials. Houses of poor or average construction may receive major damage, including complete roof failure and possible wall collapse; a few may suffer severe damage.
    Most well-constructed houses may sufer minor to moderate roof damage, with some houses experiencing major roof failure; blown out windows are also likely.
    Failure of aluminum and steel roofs and ceverings may occure in buildings at industrial parks.
    Some glass in most high-rise office buildings may be blown out; a few of these buildings may have minor to moderate damage and higher proportion of blown-out windows due to swaying.
    Considerable airborne debris willbe generated and may cause damage, injury, and possible fatalities.
    Near total loss of power supply and telecommunications due to numerous downed power lines, poles, and cellular towers. Diminished availability of potable water supply is also likely.
    Significant to severe disruption to public transportation.
    Significant damage to banana and similar plants. Most small tress and some large trees will be broken, defoliated, or uprooted. Almost total damage to rice and other crops.

`,
    category: "windSpeed",
    leadTime: "18 Hours",
    subcategory: "cyclone",
  },
  {
    term: "Super Typhoon",
    subtitle: "Wind Signal 5",
    threshold: "185KPH and above",
    definition: `<strong>Potential Impacts:</strong>
    
    Severe to catasrophic damage is expected to houses of poor or average construction, makeshift or old, dilapidated structures, and other structures made of light materials. Well-constructed houses may suffer substatial roof and wall failure or damage.
    Many industrial buildings will be destroyed, with only few receiving partial roof and wall damage.
    Most windows will be blowdn out n high-rise office buildings; Moderate structural damage is possible due to swaying.
    Extensive damage will be cause by airborne debris. People, pets, and livestock exposed to the wind are at great risk of injury or death.
    Electricity, potable water supply, and telecommunications will be unavailable for prolonged periods due to significant disruption in infrastructure.
    Prolonged significant to severe disruption to pucblic transportation.
    Vast majority of the trees will be broken, defoliated, or unrooted. Banana and similar plants will be extensively damaged. Few strees, plants, and crops will survive.
`,
    category: "windSpeed",
    leadTime: "12 Hours",
    subcategory: "cyclone",
  },
  {
    term: "Intense Rain",
    subtitle: "Orange Rainfall",
    threshold: "15-30mm/h",
    definition: "Flooding is threatening",
    category: "precipitation",
  },
  {
    term: "Torrential Rain",
    subtitle: "Red Rainfall",
    threshold: "30mm/h and above",
    definition: "Flooding is threatening",
    category: "precipitation",
  },
];
