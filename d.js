var http = require('http');
let fs = require('fs');
var files = [];
var tfiles = 0;
var win = {};
function Fs(filename, data) {
    fs.writeFileSync(filename, data);
    win[filename] = data;
    return;
}
function Shell(command) {
    const { exec } = require("child_process");
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}
function ask(txt) {
    let r
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question(txt ? txt : '', name => {
        r = name;
    });
    return r;
}
function render(_view, data) {
    var view = render.views[view];
    for (var key in data) {
        var value = data[key];
        view.replace("{{" + key + "}}", value);
    }
    return view;
}

render.views = {
    "someView": "<p>{{foo}}</p>"
};
const https = require('https');

/**
 * getJSON:  RESTful GET request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 */

module.exports.getJSON = (options, onResult, a = 0) => {
    console.log('rest::getJSON');
    const port = options.port == 443 ? https : http;

    let output = '';

    {
        const req = port.request(options, (res) => {
            console.log(`${options.host} : ${res.statusCode}`);
            res.setEncoding('utf8');

            res.on('data', (chunk) => {
                output += chunk;
            });

            res.on('end', () => {
                let obj
                try { obj = JSON.parse(output); } catch (err) { obj = output }

                onResult(res.statusCode, obj);
            });
        });

        req.on('error', (err) => {
            // res.send('error: ' + err.message);
        });

        req.end();
    };
}
async function fA(name, host, path, port = 443) {
    await new Promise((a2, b2) => {
        module.exports.getJSON(
            {
                port: port,
                host: host,
                path: path
            },
            (a, b) => {
                tfiles++;
                console.log('status:', a)
                console.log('lines:', b.split('\n').length);
                console.log('chars:', b.split('').length);
                console.log('Adding file');
                files.push([name, b]);
                console.log('added', name)
                console.log('Total files', files.length)
                a2();

            })
    })
    return;
}
function De(url) {
    var pathArray = url.split('/')
    var pro = pathArray[0];
    var dom = pathArray[2];
    var newPathname = "";
    for (i = 2; i < pathArray.length; i++) {
        newPathname += "/";
        newPathname += pathArray[i];
    }
    return {proc:pro, host:dom, path:url.split(dom)[1] };
}
(async () => {
    await fA('Mods.html', 'raw.githubusercontent.com', '/naquangaston/idk/main/Mods.html');
    console.log('Version', eval(files[0][1].split('</h1></center>')[0].split('<center><h1>V-')[1]))
    var urls = [];
    urls.push (De('https://raw.githubusercontent.com/naquangaston/idk/main/README.md'));
    urls.push(De('https://raw.githubusercontent.com/naquangaston/idk/main/vrcUpdater.cmd'))
    urls.push(De('https://www.npmjs.com/package/npm?activeTab=versions'))
    await fA('Read_me.txt', urls[0].host, urls[0].path);
    await fA('Installer.bat', urls[1].host, urls[1].path);
    await fA('Version1.txt', urls[2].host, urls[2].path);
    files.forEach(e => { Fs(e[0], e[1]) })
    var s=win['Version1.txt'].split('<div class="_702d723c dib w-50 bb b--black-10 pr2"><h3 class="c84e15be f5 mt2 pt2 mb0 black-50">Version</h3><p class="f2874b88 fw6 mb3 mt2 truncate black-80 f4">')[1].split('</p></div>')[0];
    Fs('Version.txt', s);
    console.log(s)
})()
