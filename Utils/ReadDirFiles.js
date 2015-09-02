var fs=require('fs');
function getFiles(dir, files_){
        files_ = files_ || {};
        var files = fs.readdirSync(dir);
        for (var i in files){
            var filename=files[i];
            var name = dir + '/' + files[i];
            var fsStat=fs.statSync(name);

            if (fsStat.isDirectory()){
                getFiles(name, files_);
            } else {
                files_[filename]=fsStat.mtime.getTime();
            }
        }
        return files_;
 }
module.exports=getFiles;