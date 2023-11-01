/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe.
*/

/* Pass the embed mode option here */
const viewerConfig = {
    embedMode: "LIGHT_BOX",
    showAnnotationTools: false
};
/*    defaultViewMode: "TWO_COLUMN",


/* Wait for Adobe Acrobat Services PDF Embed API to be ready and enable the View PDF button */
document.addEventListener("adobe_dc_view_sdk.ready", function () {
    document.getElementById("view-pdf-btn").disabled = true;
});


/* Function to render the file using PDF Embed API. */
function previewFile()
{
    /* Initialize the AdobeDC View object */
    var adobeDCView = new AdobeDC.View({
        /* Pass your registered client id */
        clientId: "e1955eb7e1684ee098e1ef8026cefab0"
    });

    /* Invoke the file preview API on Adobe DC View object */
    adobeDCView.previewFile({
        /* Pass information on how to access the file */
        content: {
            /* Location of file where it is hosted */
            location: {
                url: "/assets/resume_v1.0.4.pdf",
                /*
                If the file URL requires some additional headers, then it can be passed as follows:-
                header: [
                    {
                        key: "<HEADER_KEY>",
                        value: "<HEADER_VALUE>",
                    }
                ]
                */
            },
        },
        /* Pass meta data of file */
        metaData: {
            /* file name */
            fileName: "resume.pdf"
        }
    }, viewerConfig).then(function() {
            /* Enable the View PDF button */
            document.getElementById("view-pdf-btn").disabled = false;
        });

    /* Load all pages */
    adobeDCView.getAPIs().then(function (apis) {
        var totalPagesPromise = apis.getTotalPages();
        totalPagesPromise.then(function (totalPages) {
            for (var i = 1; i <= totalPages; i++) {
                adobeDCView.getAPIs().then(function (apis) {
                    var setPagePromise = apis.setPage(i);
                    setPagePromise.then(function () {
                        console.log("Page", i, "loaded");
                    });
                });
            }
        });
    });
};