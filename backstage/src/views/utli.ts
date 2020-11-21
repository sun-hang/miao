export const errorAlert = (title: string, message: string, self: any) => {
    self.$notify({
        title: title,
        type: "warning",
        message: message,
    })
}

export const upload = async (path: string, option: any, cd: Function, self: any) => {
    const res: any = await fetch("/api/bigad", option)
        .then((res) => res.json())
    if (res.data) {
        self.$notify({
            title: "添加成功",
            type: "success",
            message: "成功添加一条数据",
            onClose() {
                cd()
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