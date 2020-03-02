var classifyUrl = '/api/v1/classify';

function resetFileProgress(){
  $('#progress .progress-bar').css('width', '0%');
  $('#progress').hide();
}

function resetFiles(){
  $('#files').empty();
}

function startFileUpload(){
  $('#progress').show();
}

function resetClassification(){
  $('#result').empty();
}

function resetClassificationBar(){
  $('#confidence').empty();
}
function resetPredictionImage(){
  $('#painting-box').empty();
}

function resetClassificationRow(){
  $('#classification-row').empty();
}

function fileUpload(){
  var fileupload = [
    '<div class="col-sm-6">',
    '<div class="reveal">',
      '<div class="section-title-show">',
        '<h3>File Upload</h3>',
      '</div>',
      '<div class="panel panel-default">',
        '<div class="panel-body">',
          '<div id="progress" class="progress">',
            '<div class="progress-bar progress-bar-success"></div>',
          '</div>',
          '<div id="files" class="files"></div>',
        '</div>',
      '</div>',
    '</div>',
  '</div>',
  ].join("\n");
  $("#classification-row").append(fileupload)
}

function classificationResult(){
  var classificationResult = [
    '<div class="col-sm-6">',
      '<div class="reveal">',
        '<div class="section-title-show">',
          '<h3>Classification Result</h3>',
        '</div>',
        '<div class="panel panel-default">',
          '<div class="panel-body">',
            '<div id="result"></div>',
            '<div id="confidence"></div>',
            '<div id="painting-box" class="painting-box"></div>',
          '</div>',
        '</div>',
      '</div>',
    '</div>',
  ].join("\n");
  $("#classification-row").append(classificationResult)
}

function animateConfidence(maxKey){
  $('#confidence').each(function(){
    var progress = $(this);
    var percent = progress.data('percent');
    console.log(maxKey);
    percent = maxKey;

    var bar = new ProgressBar.Line(this, {
      color: '#6fda00',
      strokeWidth: 4,
      easing: 'easeInOut',
      duration: 1400,
      trailColor: '#eee',
      trailWidth: 1,
      svgStyle: {width: '100%', height: '100%'},
      text: {
        style: null,
        autoStyleContainer: false
      },
      step: (state, bar) => {
        bar.setText(Math.round(bar.value()) + ' % PPC');
      }
    });
    bar.animate(percent);
  });
}

function printClassificationResult(data){
  console.log(data)
  $('<h4/>').text("BI-RADS O: " + Number(data[0]).toFixed(2) + "%").appendTo('#result').css({ 'font-weight': 'bold' });
  $('<h4/>').text("BI-RADS 1: " + Number(data[1]).toFixed(2) + "%").appendTo('#result').css({ 'font-weight': 'bold' });
  $('<h4/>').text("BI-RADS 2: " + Number(data[2]).toFixed(2) + "%").appendTo('#result').css({ 'font-weight': 'bold' });
}

$(document).ready(function(){
  window.sr = ScrollReveal();
  sr.reveal('.reveal');
});

function read_file(image_file){
  var reader = new FileReader();

  reader.onload = (function(file) {
    return function(e) {
      var img = $('<img>');
      img.attr('src', e.target.result);
      img.attr('title', file.name);
      img.addClass('img-results');
      img.appendTo('#files');
    };
  })(image_file);

  reader.readAsDataURL(image_file);
}

$(document).ready(function(){
  $('#fileupload').fileupload({
    url: classifyUrl,
    singleFileUploads: false,
    maxNumberOfFiles: 4,
    cache: false,
    dataType: 'json',
    send: function (e, data) {
      resetFiles();
      resetClassification();
      resetClassificationBar();
      resetPredictionImage();
      resetClassificationRow();
      fileUpload();
      startFileUpload();

      for(var i = 0; i< data.files.length; i++){
        var f = data.files[i];
        read_file(f);
      }
    },
    progressall: function(e, data) {
      var progress = parseInt(data.loaded / data.total * 100, 10);
      $('#progress .progress-bar').css('width', progress + '%');
    },
    done: function (e, data) {
      resetFileProgress();
      classificationResult();
      printClassificationResult(data.result);
    }
  })
  .prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');
});