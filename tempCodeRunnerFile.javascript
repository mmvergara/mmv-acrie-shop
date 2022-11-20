const { URLSearchParams } = require('url');
const encodedParams = new URLSearchParams();


encodedParams.set('api_paste_code', 'test');
encodedParams.set('api_option', 'paste');
encodedParams.set('api_dev_key', 'IRu7VnMjWIQbNG-ckY98TxoROBJc33PX');


let url = 'https://pastebin.com/api/api_post.php';

let options = {
  method: 'POST',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  body: encodedParams.toString()
};

const fetchResult = await fetch(url, options);


output =  {output: fetchResult}