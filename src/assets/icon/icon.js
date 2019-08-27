const fs = require('fs');
const filepath = './../icon';
let writedata = [];

fs.readdir(filepath,(err,filesnames) => {
  if (err) {
    onerror(err);
    return;
  }
  let re = new RegExp('\.svg$');
  for (let i=0; i<filesnames.length;i++) {
    if (re.test(filesnames[i])) {
      let temp = {name:filesnames[i].replace(/\.[^/.]+$/, "")};
      writedata.push(temp);
    }
  }

  fs.writeFile("icon.json",JSON.stringify(writedata), (err)=> {
    if (err) console.log(err);
    console.log('write success');
  })
});
