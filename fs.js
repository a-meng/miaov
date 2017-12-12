var fs = require('fs');

function go(path) {
    let fstate = fs.lstatSync(path);
    if (fstate.isFile()) {
        let size = parseInt(fstate.size / (1000 * 1000));
        if (size < 200) {
            fs.unlinkSync(path);
        }else{
        
            let arr=path.split('\\');
            console.info('文件' ,arr);
            if(arr.length>=2){
                try{
                    fs.renameSync(path,'E:\\'+arr[arr.length-1]);
                }catch(err){
                    console.info(err)
                }
                
            }
        }
    } else if (fstate.isDirectory()) {
    
        let files = fs.readdirSync(path);
        if (files.length == 0) {
            console.info('文件夹：', path,'是空的 删除掉！');
            fs.rmdirSync(path);
        } else {
            files.forEach(function (file) {
                let p = path + '\\' + file;
                go(p);
            })
        }

    }
}
go('E:\hehe');
