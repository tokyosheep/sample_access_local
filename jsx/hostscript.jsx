/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/


function openFile(array){
    for(var i=0;i<array.length;i++){
        var f = new File(array[i]);//ファイルオープンのため一度オブジェクト化
        app.open(f);
    }
}
