const formIdvProvider = document.getElementById('providerIdvForm');
const btnAddProvider = document.getElementById('btnAddValuesToIdvProviderForm');
const btnSubmitFormIdvProvider = document.getElementById('btnSubmitIdvProviderForm');
const inputIdvProviderSearch = document.getElementById('npi_idv');

btnAddProvider.addEventListener("click", getInputData,false);
btnSubmitFormIdvProvider.addEventListener("click", submitForm,false);

function submitForm(e){
e.preventDefault();
getInputData();
addTableRow();
inputIdvProviderSearch.value = '';
formIdvProvider.reset();
};



function addTableRow() {
let rowLength = $('#example tbody tr').length+1;
let counter = rowLength;
let rowData = localStorage.getItem("Provider Idv");
let providerIdv = JSON.parse(rowData);


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

    


    var prefixURL = `https://clinicaltables.nlm.nih.gov/api/npi_idv/v3/search?terms=`;
    var npiValue =  $('#provNpi').val();
    var suffixURL = `&ef=NPI,name.first,name.last,provider_type,gender,addr_practice.line1,addr_practice.line2,addr_practice.city,addr_practice.state,addr_practice.zip,addr_practice.phone`;
    fetch(`${prefixURL}${npiValue}${suffixURL}`)
    .then((response) => response.json())
    .then((data) => JSON.stringify(data[2]))
    .then((data) => localStorage.setItem("Provider Idv", data))  
    }
    


