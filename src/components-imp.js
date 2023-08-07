import { CommonUtils } from 'aj-antd-components'

export default {
  select: {
    department: async () => {
      await CommonUtils.waitForSeconds(0.2)
      return [
        { label: '总裁办', value: '1' },
        { label: '研发中心', value: '2' },
        { label: '市场运营部', value: '3' },
      ]
    },
  },
  cascader: {
    department: async () => {
      await CommonUtils.waitForSeconds(0.2)
      return [
        {
          label: '总裁办',
          value: '1',
          children: [
            { label: 'CTO', value: 'CTO' },
            { label: 'CFO', value: 'CFO' },
            { label: 'COO', value: 'COO' },
          ],
        },
        {
          label: '运营总',
          value: '2',
          children: [
            { label: '新媒体运营', value: '22' },
            { label: '商品运营', value: '23' },
          ],
        },
      ]
    },
  },
  table: {
    post: (uri, send) => {
      console.log(send)
      return {
        data: {
          totalCount: 30,
          list: new Array(30).fill(0).map(() => {
            return new Array(10).fill(0).reduce(
              (a, b, i) => {
                a[i] = i
                return a
              },
              { id: Math.random() }
            )
          }),
        },
      }
    },
  },
  upload: {
    getImageUrl() {
      return '/test-img.webp'
    },
    uploadFile() {
      return Promise.resolve('test-img.webp')
    },
  },
}
