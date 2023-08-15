//用户小相关接口
let UserApi = {
    queryUserList : "/user/list", //获取用户列表
    addUser : "/user/add", //添加用户
    deleteUser : "/user/delete", //删除用户
    editUser : "/user/edit", //修改用户信息
    accountIsExist : "/user/isExistAccount", //判断账号是否存在
    register:"/register",  //注册用户
    userInfo: "/user/info"//获取当前用户信息
}

// 通用模块相关接口
let CommonApi={
    login : "/login", //登录
    loadDictionary : "/dictionary/loadDictionary",
}

let lab = {
    getAllEquipmentInfo: "/SimulationEquipment"
}

export {
    UserApi,
    CommonApi,
    lab
}