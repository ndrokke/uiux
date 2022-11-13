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
    });