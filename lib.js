function uuid() {
    let d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function download_pack(packName,code) {
    var manifest = {
            "format_version": 2,
            "header": {
                "description": "§e此附加包使用§bGametest生成器§e製作！",
                "name": packName,
                "uuid": uuid(),
                "version": [0, 0, 1],
                "min_engine_version": [ 1, 14, 0 ]
            },
            "modules": [
                {
                    "description": "Plugin Module",
                    "type": "javascript",
                    "uuid": "cb4ad4b0-0607-11ec-9a03-0242ac130003",
                    "version": [0, 0, 1],
                    "entry": "scripts/main.js"
                }
            ],
            "dependencies": [
                {
                    "uuid": "b26a4d4c-afdf-4690-88f8-931846312678",
                    "version": [ 0, 1, 0 ]
                },
                {
                    "uuid": "6f4b6893-1bb6-42fd-b458-7fa3d0c89616",
                    "version": [ 0, 1, 0 ]
                },
                {
                    "uuid": "2BD50A27-AB5F-4F40-A596-3641627C635E",
                    "version": [ 0, 1, 0 ]
                }
            ]
        }

    var zip = new JSZip();
    //添加文字檔案
    zip.file("manifest.json", JSON.stringify(manifest));
    //添加資料夾
    var script = zip.folder("scripts");
    script.file("main.js", code);

    zip.generateAsync({type: 'blob'}).then(function(content) {
    var filename = packName + '.mcpack';
    var el= document.createElement('a');
    el.download = filename;
    el.style.display = 'none';
    el.href = URL.createObjectURL(content);
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
    });
}