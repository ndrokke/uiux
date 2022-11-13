const idvProviderData = [
[
"7",
"1164407086",
"SCHNALL, S",
"Podiatry",
"M",
"2025 E STATE ST, HERMITAGE, PA 16148",
"(724) 981-4681"
],
[
"6",
"1649207630",
"SHERRILL, S.",
"Physician/Internal Medicine",
"F",
"9333 PARK WEST BLVD, KNOXVILLE, TN 37923",
"(865) 531-4600"
],
[
"5",
"1326219379",
"NAIK, S",
"Dentist",
"M",
"203 E SANTA FE, TOLUCA, IL 61369",
"(815) 452-2513"
],
[
"4",
"1750342861",
"MOSS, S.",
"Physician/General Surgery",
"M",
"1919 E THOMAS RD BLDG. B, PHOENIX, AZ 85016",
"(602) 546-1000"
],
[
"3",
"1457468852",
"AGOFF, S",
"Physician/Pathology",
"M",
"1100 9TH AVE, SEATTLE, WA 98101",
"(206) 223-6600"
],
[
"2",
"1235342809",
"BRENNER, S PAIGE",
"Counselor",
"F",
"1912 BOOTHE CIRCLE SUITE 200, LONGWOOD, FL 32750",
"(407) 327-1765"
],
[
"1",
"1437422656",
"BADAGLIALACQUA, S BRUCE",
"Physician/Family Practice",
"M",
"5850 E STILL CIR, MESA, AZ 85206",
"(480) 219-6050"
]
];

// DATATABLE JS
$(document).ready(function () {
var t = $('#example').DataTable({
data: idvProviderData,
dom: '<rt>',
order: [[0, 'desc']],
columns: [
{ title: 'ID' },
{ title: 'NPI' },
{ title: 'Name' },
{ title: 'Provider Type' },
{ title: 'Gender' },
{ title: 'Practice Address' },
{ title: 'Phone' },
],
});


var rowLength = $('#example tbody tr').length+1;
var counter = rowLength;

$('#btnSaveIdvProviderForm').on('click', function (e) {
e.preventDefault();
getInputData();
addTableRow();
$('#npi_idv').val('');
provIdvForm.reset();
});

function addTableRow() {
var rowData = localStorage.getItem("Provider Idv");
var providerIdv = JSON.parse(rowData);


t.row.add([
counter,
providerIdv.NPI,
providerIdv["name.first"]  + ' ' + providerIdv["name.last"],
providerIdv.provider_type,
providerIdv.gender,
providerIdv["addr_practice.line1"] + ' - ' + providerIdv["addr_practice.line2"] + ' ' + providerIdv["addr_practice.city"] + ', ' + providerIdv["addr_practice.state"] + ' ' + providerIdv["addr_practice.zip"],
providerIdv["addr_practice.phone"],
]).draw(false);

counter++;

}





// API JS

new Def.Autocompleter.Search(
'npi_idv',
'https://clinicaltables.nlm.nih.gov/api/npi_idv/v3/search?df=NPI,name.first,name.last,provider_type,gender,addr_practice.line1,addr_practice.line2,addr_practice.city,addr_practice.state,addr_practice.zip,addr_practice.phone&ef=NPI,name.first,name.last,provider_type,gender,addr_practice.line1,addr_practice.line2,addr_practice.city,addr_practice.state,addr_practice.zip,addr_practice.phone:test_phone',
// 'https://clinicaltables.nlm.nih.gov/api/npi_idv/v3/search?df=NPI,name.credential,name.prefix,name.first,name.last,name.suffix,provider_type,gender,addr_practice.line1,addr_practice.line2,addr_practice.city,addr_practice.state,addr_practice.zip,addr_practice.phone&ef=NPI,name.credential,name.prefix,name.first,name.last,name.suffix,provider_type,gender,addr_practice.line1,addr_practice.line2,addr_practice.city,addr_practice.state,addr_practice.zip,addr_practice.phone',
{ tableFormat: true,
valueCols: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
colHeaders: ['NPI','First Name', 'Last Name', 'Provider Type', 'Gender', 'L1', 'L2','City',"St","Zip",'Phone']
});



function getInputData() {
    // Get data from input and create array of objects
    var inputNPI = $('#npi_idv').val().split(' - ');
    var providers = Array.from(inputNPI);
    var providerObj = [];
    
    var NPI = providers[0];
    var firstName = providers[1];
    var lastName = providers[2];
    var type = providers[3];
    var gender = providers[4];
    var addressLineOne = providers[5];
    var addressLineTwo= providers[6];
    var addressCity = providers[7];
    var addressState = providers[8];
    var addressZip = providers[9];
    var addressPhone = providers[10];
    
    providerObj.push({
        ['NPI'] : NPI,
        ['firstName'] : firstName,
        ['lastName'] : lastName,
        ['type'] : type,
        ['gender'] : gender,
        ['addressLineOne'] : addressLineOne,
        ['addressLineTwo'] : addressLineTwo,
        ['addressCity'] : addressCity,
        ['addressState'] : addressState,
        ['addressZip'] : addressZip,
        ['addressPhone'] : addressPhone
    });
    
    var providerIdv = providerObj[0];
        
    $('#provNpi').val(NPI);
    $('#provFirstName').val(firstName);
    $('#provLastName').val(lastName);
    $('#provType').val(type);
    $('#provGender').val(gender);
    $('#provAddrOne').val(addressLineOne);
    $('#provAddrTwo').val(addressLineTwo);
    $('#provCity').val(addressCity);
    $('#provState').val(addressState);
    $('#provZip').val(addressZip);
    $('#provPhone').val(addressPhone);

    let formValues = $('form input').val();
    var prefixURL = `https://clinicaltables.nlm.nih.gov/api/npi_idv/v3/search?terms=`;
    var npiValue =  $('#provNpi').val();
    var suffixURL = `&ef=NPI,name.first,name.last,provider_type,gender,addr_practice.line1,addr_practice.line2,addr_practice.city,addr_practice.state,addr_practice.zip,addr_practice.phone`;
    fetch(`${prefixURL}${npiValue}${suffixURL}`)
    .then((response) => response.json())
    .then((data) => JSON.stringify(data[2]))
    .then((data) => localStorage.setItem("Provider Idv", data))    
    }
    


 const provIdvForm = document.getElementById('providerIdvForm');
 const btnAddValuesToInputs = document.getElementById('btnAddValesToInputs');
 btnAddValuesToInputs.addEventListener("click", getInputData,false);

});