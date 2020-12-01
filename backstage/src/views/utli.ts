export const errorAlert = (title: string, message: string, self: any) => {
    self.$notify({
        title: title,
        type: "warning",
        message: message,
    })
}

export const upload = async (path: string, option: any, cd: Function, self: any) => {
    const res: any = await fetch(path, option)
        .then((res) => res.json())
    if (res.data) {
        self.$notify({
            title: res.msg,
            type: "success",
            message: res.msg,
            onClose() {
                cd(res)
            },
        });
    } else {
        self.$notify({
            title: "添加失败",
            type: "error",
            message: res.data,
        });
    }
}