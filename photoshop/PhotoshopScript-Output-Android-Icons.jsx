// Output Android Icons.jsx
// 2012 Todd Linkner
// License: none (public domain)
// v1.0
//
// This script is for Photoshop CS6. It outputs Android icons of the  
// following sizes from a source PSD at least 512px x 512px
//
// store:
//	Icon.png		(512px x 512px)
//
// xhdpi:
//	Icon.png		(96px x 96px)
//
// hdpi:
//	Icon.png		(72px x 72px)
//
// mdpi:
//	Icon.png		(48px x 48px)
//
// ldpi:
//	Icon.png		(36px x 36px)

/*
// BEGIN__HARVEST_EXCEPTION_ZSTRING
<javascriptresource>
<name>$$$/JavaScripts/OutputAndroidIcons/MenuAlt=Output Android Icons</name>
<category>mobile</category>
</javascriptresource>
// END__HARVEST_EXCEPTION_ZSTRING
*/

// bring Photoshop into focus
#target photoshop

main();

function main() {

    var cleanup = confirm("This script outputs Android store, SHDPI, HDPI, "
                        + "MDPI, and LDPI icons from a source PSD at least 512px x "
                        + "512px\r\r"
                        + "Do you want to delete your original files when "
                        + "complete?");

    // Ask user for input folder
    var inputFile = File.openDialog("Select a PNG file at least 512px x 512px","PNG File:*.png");
	if (inputFile == null) throw "No file selected. Exting script.";

    // Open file
	open(inputFile);
    var docRef = app.activeDocument;

	// Make output folders
	var dir = Folder(app.activeDocument.path+"/generated-icons");
    if(!dir.exists) dir.create();

    // Set ruler untis to pixels
    app.preferences.typeUnits = TypeUnits.PIXELS

    // Store icons: windows
    resize(dir,1024);
    resize(dir,512);
    resize(dir,256);
    resize(dir,128);
    resize(dir,48);
    resize(dir,32);
    resize(dir,16);
    // Store icons: android
    resize(dir,192);
    resize(dir,144);
    resize(dir,96);
	resize(dir,72);
	resize(dir,48);
    resize(dir,36);

    // Clean up
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    // Delete the original
	if (cleanup) inputFile.remove();

    alert("Done!");
}

function resize(dir,size) {
    // Setup file name
    var fname = app.activeDocument.name.replace(/\s+/g, '_').replace(/([a-z\d])([A-Z])/g, '$1_$2').toLowerCase();

    // Set export options
    var opts, file;
    opts = new ExportOptionsSaveForWeb();
    opts.format = SaveDocumentType.PNG;
    opts.PNG8 = false; 
    opts.transparency = true;
    opts.interlaced = 0;
    opts.includeProfile = false;
    opts.optimized = true;

    // Duplicate, resize and export
    var tempfile = app.activeDocument.duplicate();
    tempfile.resizeImage(size+"px",size+"px");
    file = new File(dir+"/"+fname.split('.')[0]+"_"+size+"x"+size+"."+fname.split('.')[1]);
    tempfile.exportDocument(file, ExportType.SAVEFORWEB, opts);
    tempfile.close(SaveOptions.DONOTSAVECHANGES);
}
