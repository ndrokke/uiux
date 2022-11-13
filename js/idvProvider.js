const idvProviderData = [
    [
        "1164407086",
        "SCHNALL, S",
        "Podiatry",
        "M",
        "2025 E STATE ST, HERMITAGE, PA 16148",
        "(724) 981-4681"
    ],
    [
        "1649207630",
        "SHERRILL, S.",
        "Physician/Internal Medicine",
        "F",
        "9333 PARK WEST BLVD, KNOXVILLE, TN 37923",
        "(865) 531-4600"
    ],
    [
        "1326219379",
        "NAIK, S",
        "Dentist",
        "M",
        "203 E SANTA FE, TOLUCA, IL 61369",
        "(815) 452-2513"
    ],
    [
        "1750342861",
        "MOSS, S.",
        "Physician/General Surgery",
        "M",
        "1919 E THOMAS RD BLDG. B, PHOENIX, AZ 85016",
        "(602) 546-1000"
    ],
    [
        "1457468852",
        "AGOFF, S",
        "Physician/Pathology",
        "M",
        "1100 9TH AVE, SEATTLE, WA 98101",
        "(206) 223-6600"
    ],
    [
        "1235342809",
        "BRENNER, S PAIGE",
        "Counselor",
        "F",
        "1912 BOOTHE CIRCLE SUITE 200, LONGWOOD, FL 32750",
        "(407) 327-1765"
    ],
    [
        "1437422656",
        "BADAGLIALACQUA, S BRUCE",
        "Physician/Family Practice",
        "M",
        "5850 E STILL CIR, MESA, AZ 85206",
        "(480) 219-6050"
    ]
];

$(document).ready(function () {
    $('#example').DataTable({
        data: idvProviderData,
        columns: [
            { title: 'NPI' },
            { title: 'Name' },
            { title: 'Provider Type' },
            { title: 'Gender' },
            { title: 'Practice Address' },
            { title: 'Phone' },
        ],
    });
});

new Def.Autocompleter.Search(
  'npi_idv',
  'https://clinicaltables.nlm.nih.gov/api/npi_idv/v3/search?df=NPI,name.full,provider_type,gender,addr_practice.full,addr_practice.phone',
  {tableFormat: true, valueCols: [0, 2],
    colHeaders: ['NPI','Name','Provider Type', 'Gender', 'Practice Address', 'Phone']
  }); 