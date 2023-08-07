const ComponentInterface = {
  time: {
    iso: false,
  },
  tablelayout: {
    clearOnReset: true,
  },
  // 接口数据源实现 fetch[handler](data)
  cascader: {},
  select: {},
  // 上传配置
  upload: {
    getImageUrl: (imageUrl) => {
      let url = ''
      if (imageUrl && imageUrl.startsWith('http')) {
        url = imageUrl
      } else if (imageUrl) {
        url = sessionStorage.getItem('PATH') + imageUrl
      }
      if (url == '') return undefined
      return url + '?token=' + sessionStorage.getItem('TOKEN')
    },
    uploadFile: () => {
      return
    },
  },
  richtext: () => {
    return {
      fileFieldName: 'file',
      uploadUrl: '',
      headers: {},
      hooks: {
        customInsert: (insertImg, result) => {
          // 插入图片
          insertImg(result)
        },
      },
      fontNames: ['宋体', '微软雅黑', 'Arial', 'Tahoma', 'Verdana'],
    }
  },
  // 表格配置
  table: {
    page: {
      page: 1,
      limit: 20,
    },

    // 如果不分页，data可以为数组
    get: () => {
      return {
        data: {
          list: [],
          totalCount: 0,
        },
      }
    },
    post: () => {
      return {
        data: {
          list: [],
          totalCount: 0,
        },
      }
    },
    orderBy: (sorter) => {
      return sorter.columnKey + ' ' + (sorter.order === 'ascend' ? 'asc' : 'desc')
    },
  },
}

export default ComponentInterface
