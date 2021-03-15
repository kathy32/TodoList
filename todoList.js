$(function() {
  load()

  // 1. 添加功能
  $("#title").on("keydown", function(event) {
    if (event.keyCode === 13) {
      if ($(this).val() === "") {
        alert("请输入 ToDo 内容.")
      } else {
        var localData = getData()
        localData.push({
            title: $(this).val(),
            done: false
        })
        saveData(localData)
        load()
        // 清空输入框
        $(this).val("")
      }
    }
  })

  // 2. 删除功能
  $("#todolist, #donelist").on("click", "a", function() {
    var localData = getData()
    var index = $(this).attr("id")  // 获取元素
    localData.splice(index, 1)
    saveData(localData)
    load()
  })


  // 3. 模糊匹配功能
  $("#title").on("keydown",function(){
    var txt = $(this).val();
    if($.trim(txt) !== ""){
      $("li").hide().filter(":contains('"+txt+"')").show();
    }else{
      $("li").show();
    }
  })



  // 4. 未完成和已完成的状态
  $("#todolist, #donelist").on("click", "input", function() {
    var localData = getData()
    // 修改数据 this -> input
    var index = $(this).siblings("a").attr("id")
    localData[index].done = $(this).prop("checked")
    saveData(localData)
    load()
  })


  // 渲染数据
  function load() {
    var data = getData()
    $("ol, ul").empty()

    $.each(data, function(i, el) {
      if (el.done) {
          $("#donelist").append("<li><input type='checkbox' checked='checked'/><p>" + el.title + "</p><a href='#' id='" + i + "'><div class='del'>X</div></a></li>")
      } else {
          $("#todolist").append("<li><input type='checkbox'/><p>" + el.title + "</p><a href='#' id='" + i + "'><div class='del'>X</div></a></li>")
      }
    })
  }

  // 获取本地存储的数据
  function getData() {
    var data = localStorage.getItem("todolist")
    if (data !== null) {
        return JSON.parse(data)
    } else {
        return []
    }
  }

  // 保存本地存储数据
  function saveData(data) {
    localStorage.setItem("todolist", JSON.stringify(data))
  }
  
})