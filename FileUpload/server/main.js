const http=require('http');
const path=require('path');
const multiparty=require('multiparty');
const fse =require('fs-extra');//fs 扩展包  需要下载到本地 npm install fs-extra
const UPLOAD_DIR=path.resolve(__dirname,".","taget");
const server =http.createServer();

server.on("request",async (req,res)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Header","*");
    res.end("helloqiuz");
    console.log("正在监听3000端口:"+res);
    
    if(req.url=='/'){
        const multipart=new multiparty.Form();//将form表单里面的数据取出来 
        // console.log(multipart);
        multipart.parse(req,async(err,fields,files)=>{
            if(err){
                return ;
            }
           // console.log(files);
           
            const [chunk]=files.chunk;
            const [filename]=fields.filename;
            //console.log(filename);
            const dir_name=filename.split('-')[0];
            const chunkDir=path.resolve(UPLOAD_DIR,dir_name);
           console.log(chunkDir);
           if(!fse.existsSync(chunkDir)){
               await fse.mkdirs(chunkDir);
           }
           await fse.move(chunk.path,`${chunkDir}/${filename}`);//将文件移动过来 并且改名
        });
       
    }
});
server.listen(3030,()=>
    console.log("正在监听3000端口")
);