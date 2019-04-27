/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/



window.onload = function(){
    `use strict`;
    const csInterface = new CSInterface();
    themeManager.init();
    const dir_home = process.env[process.platform == `win32` ? `USERPROFILE` : `HOME`];
    const dir_desktop = require(`path`).join(dir_home, `Desktop`);//デスクトップパス
    
    const open_window = document.getElementById(`open_window`);
    const save_window = document.getElementById(`save_window`);
    const opned_file_list = document.getElementById(`opned_file_list`);
    
     /**
     * Displays the OS File Open dialog, allowing the user to select files or directories.
     *
     * @param allowMultipleSelection {boolean} When true, multiple files/folders can be selected.
     * @param chooseDirectory {boolean} When true, only folders can be selected. When false, only
     *        files can be selected.
     * @param title {string} Title of the open dialog.
     * @param initialPath {string} Initial path to display in the dialog. Pass NULL or "" to
     *        display the last path chosen.
     * @param fileTypes {Array.<string>} The file extensions (without the dot) for the types
     *      of files that can be selected. Ignored when chooseDirectory=true.
     *
     * @return An object with these properties:
     *      <ul><li>"data": An array of the full names of the selected files.</li>
     *          <li>"err": The status of the operation, one of
     *          <br>NO_ERROR
     *          <br>ERR_INVALID_PARAMS </li>
     *      </ul>
     **/
    /*
    上記翻訳
    第一引数、ブーリアン、trueだと複数のファイルかフォルダーを選べる。
    第二引数、ブーリアン、tureだとフォルダーのみ選択可能、falseだとファイルのみ
    第三引数、String ダイアログを開いた時の表示タイトル
    第四引数、String ダイアログに表示される初期のディレクトリー null か　空""だと最後にダイアログで選択したディレクトリーを表示
    第五引数、配列　拡張子を配列の中に指定（ピリオドは入れない）　フォルダー選択がtrueの場合は無視
    
    ファイル（フォルダー）選択後オブジェクトが以下のプロパティーと共に帰ってきます。
    data 配列　選択されたファイルのフルパス
    err 稼働の状態（多分単純にエラーがあるかないかの状態かと）
    */
    open_window.addEventListener(`click`,()=>{
        const f = cep.fs.showOpenDialog(true,false,`open`,dir_desktop,[`jpg`]);
        make_list(opned_file_list,f.data);
        function make_list(list,array){
            while(list.firstChild){
                list.removeChild(list.firstChild);
            }
            array.forEach(v=>{
                const li = document.createElement(`li`);
                li.textContent = v;
                list.appendChild(li);
            });
        }
    });
    
    /**
     * Displays the OS File Save dialog, allowing the user to type in a file name.
     *
     * @param title {string} Title of the save dialog.
     * @param initialPath {string} Initial path to display in the dialog. Pass NULL or "" to
     *        display the last path chosen.
     * @param fileTypes {Array.<string>} The file extensions (without the dot) for the types
     *      of files that can be selected.
     * @param defaultName {string} String to start with for the file name.
     * @param friendlyFilePrefix {string} String to put in front of the extensions of files that can be selected. (win only)
     *      For example: 
     *          fileTypes = ["gif", "jpg", "jpeg", "png", "bmp", "webp", "svg"];
     *          friendlyFilePrefix = "Images (*.gif;*.jpg;*.jpeg;*.png;*.bmp;*.webp;*.svg)";
     * @param prompt {string} String for Save button (mac only, default is "Save" on mac and win).
     * @param nameFieldLabel {string} String displayed in front of the file name text field (mac only, "File name:" on win).
     *
     * @return An object with these properties:
     *      <ul><li>"data": The file path selected to save at or "" if canceled</li>
     *          <li>"err": The status of the operation, one of
     *          <br>NO_ERROR
     *          <br>ERR_INVALID_PARAMS </li>
     *      </ul>
     **/
    
    /*
    上記翻訳
    第一引数　String タイトル
    第二引数　String ダイアログに表示される初期のディレクトリー null か　空""だと最後にダイアログで選択したディレクトリーを表示
    第三引数　配列　選択可能拡張子を配列の中に指定（ピリオドは入れない）
    第四引数　String デフォルトのファイルネーム
    第五引数　String friendlyFilePrefix ウインドウ上で拡張子を選択時に拡張子の前に置かれる文字列。winのみ
        例えば
        fileTypes = ["gif", "jpg", "jpeg", "png", "bmp", "webp", "svg"];
        *friendlyFilePrefix = "Images (*.gif;*.jpg;*.jpeg;*.png;*.bmp;*.webp;*.svg)";
    第六引数　String 保存ボタン上に表示される文字列　macのみ　デフォルトだと"Save"(日本語だと多分"保存")
    第七引数　String ウインドウ上でファイル名の前に置かれるテキスト　macのみ　デフォルトだと"File name:"(日本語だと多分”名前”)
    ファイル（フォルダー）選択後オブジェクトが以下のプロパティーと共に帰ってきます。
    data 配列　選択されたファイルのフルパス
    err 稼働の状態（多分単純にエラーがあるかないかの状態かと）
    */
    save_window.addEventListener(`click`,()=>{
        const s = cep.fs.showSaveDialogEx(`save`,dir_desktop,["gif", "jpg", "jpeg", "png"],`picture`,`*`,`保存する?`,`御用は?`);
        console.log(s);
    });
}
    
