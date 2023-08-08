<script>
import CommonCodeHighlightVue from './CommonCodeHighlight.vue'
import CommonPageVue from './CommonPage.vue'
export default {
  render() {
    return (
      <CommonPageVue title="简介" description="组件库基于ant-design-vue二次开发，主要是render函数 JSX开发">
        <h3>安装</h3>
        <p>npm install aj-antd-components --save</p>
        <CommonCodeHighlightVue
          title="使用"
          value={`

        import vue from 'vue'
        import AComponents from 'aj-antd-components'
        import 'aj-antd-components/dist/antd.min.css'
        import 'ant-design-vue/dist/css'
      

        vue.use(AComponents,{
            time:{
                iso:false // 默认日期组件值为 iso格式
            },
            select:{
                // select 的handler属性对应这里的实现，返回一个promise，需要resolve一个包含label和value的对象数组
                handler:()=> Promise.resolve([{label:string;value:string;}])
            },
            cascader:{
                // 同select的handler，这里的级联使用children字段
                handler:()=>Promise.resolve([{label:string;value:strin;children:[{...}]}])
            },
            table:{
                page:{
                    // 每页显示条数
                    limit:20,
                    // 默认第一页
                    page:1
                },
                // DataTable组件，这里是请求的具体实现，返回一个 data:{list:[],total:0} 的分页数据结构，如果没有分页 data可以直接为数组
                post:(url,params)=> Promise.resolve(
                    {
                        data:{
                            list:[],
                            total:0
                        }
                }),
                // get请求，默认为post请求
                get:(url,params)=>Promise.resolve(
                    {
                        data:{
                            list:[],
                            total:0
                        }
                }),
                // 要传给到后端的值，asc |desc,在get或post中处理具体的传参
                orderBy:()=> string
            },
            upload:{
                getImageUrl:(uri)=>{
                    return  拼接上传后返回的相对路径，一个完整的图片资源路径
                },
                uploadFile:(file)=>{
                     const res= await 具体的上传函数
                     return 文件上传后的相对路径
                }
            },
            richtext:()=>{
                return {
                    // 富文本自定义上传图片
                    customUploadImg:(files,insertFu)=>{
                        const  res= await 上传函数
                        // 将上传后返回的路径，完整的资源路径传入到insertFu
                        insertFu()
                    },
                    fontNames:["微软雅黑",....],// 支持的字体
                }
            },
        
        })

        // 如果需要使用字典，需要在store中实现名为“dictionaries”的getter
        store.getters.dictionaries:()=> ({
            // 需要同时实现枚举类型的 map对象和_array数组，才能正确映射
            // 对象的key为枚举字段的value，值为label，主要是方便根据枚举值映射label
            enum_type_key:{value:label},
            // 数组在枚举类型后拼接_array ,用于下拉，checkbox，radio等用途
            enum_type_key_array:[{label:'',value:string;}]
        })

        `}
        />

        <CommonCodeHighlightVue title="Props" path="install.d.ts" />

        <h3>特色</h3>
        <p>
          表单、搜索列表页面，是管理系统中最常见的组件，几乎占比80%。使用JSON配置的方式能使代码降低，效率提高，极少的人力就可以支撑业务快速发展
          <br />
          以下组件是系统开发过程中使用最多的组件
        </p>

        <h3>表单组件（FormLayout）内置16个常用组件</h3>
        <p>
          支持组件联动隐藏显示、联动组件值变化、动态数组删减(type=arrayList)、快速的必填验证、支持自定义渲染、注册自定义组件
        </p>

        <h3>输入框（Input）</h3>
        <p>
          支持多种类型的强制校验，number，amount、percentage、text。 由于后端在金额时通常以分来存储数据，其中amount
          会自动转为分，percentage会转为浮点数，避免数据繁琐的转换操作。另外新增了showLimit显示当前输入字符数和总的字符数，在输入手机号，身份证号码时使用较多
        </p>

        <h3>数据选择（DataSelect）</h3>
        <p>
          支持多种数据源，自定义接口实现（handler），枚举字段（store.getters.dictionaries中实现），直接传入数组
          <br />
          通过接口或者枚举来实现数据源，能更好的将组件模块化，减少业务代码量
          <br />
          通过配置displayStyle= checkbox | radio | select（默认）来展示显示类型
        </p>
        <h3>搜索列表页面(FormTableLayout)</h3>
        <p>通过配置接口地址和表头、搜索项、操作项、状态分组tabs就能快速高效的完成页面开发</p>
      </CommonPageVue>
    )
  },
}
</script>
