var gulp = require('gulp');
var fs = require('fs');
var xml2js = require('xml2js');
var del = require('del');
var Pageres = require('pageres');

var parser = new xml2js.Parser();

var screenshotsLoc = __dirname + '/screenshots';

gulp.task('clean', function(cb) {

    del([screenshotsLoc], cb);
});

gulp.task('default', ['clean'], function(){

    fs.readFile(__dirname + '/sitemap.xml', function(err, data) {
        parser.parseString(data, function (err, result) {
            var urlsArr = result.urlset.url;
    	    var pageres = new Pageres({
    		        delay: 2
    	        })
    		    .dest(screenshotsLoc);

    		urlsArr.forEach(function(item){
    			pageres.src(item.loc[0], ['480x320', 'iphone 5s'], { crop: true });
            });

            fs.mkdirSync(screenshotsLoc);

    	    pageres.run(function (err) {
    	    	if (err) {
    	    		console.log('Completed with error: ', err);
    	    	}
    	    	else {
    	    		console.log('Completed Successfully.');
    	    	}
    	    });
        });
    });
});
