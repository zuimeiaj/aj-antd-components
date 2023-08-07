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
    uploadUrl: '',
    token: () => '',
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
