<template>
   <div class="content">
    <div class="upload-box">
        <el-upload
        ref="uploadRef"
            class="upload-demo"
            drag
            multiple
            :http-request="handleImage"
        >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
            </div>
            <template #tip>
            <div class="el-upload__tip">
                上传图片以生成pdf
            </div>
            </template>
        </el-upload>
    </div>
    <div v-if="addedArr.length > 0" class="download-box">
        <p class="info">已成功上传{{ addedArr.length }}张图片</p>
        <el-button type="success" size="large" @click="download" >点击下载</el-button>
    </div>
   </div>
</template>

<script setup>
import { ref } from 'vue'
import { jsPDF } from 'jspdf'
import { UploadFilled } from '@element-plus/icons-vue'
// const files = ref([])
const doc = new jsPDF()
const uploadRef = ref()
//  A4大小
const docWidth = 210
const docHeight = 297

const addedArr = ref([])
// 将File转为base64
const file2base64 = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()

        // onload是转换完成的事件，readAsDataURL是异步的
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
    
}
// const formatReg = /\/([^;]*)/
const handleImage = async (image) => {
    // files.value.push(image.file)
    const file = image.file
    const base64 = await file2base64(file)
    const format = getFormat(base64)
    const img = new Image()
    img.src = base64
    img.onload = () => {
        doc.addPage()
        const ratio = Math.min(docWidth/img.width, docHeight/img.height)
        const imgWidth = img.width*ratio
        const imgHeight = img.height*ratio
        const x = (docWidth - imgWidth) / 2
        const y = (docHeight - imgHeight) / 2
        doc.addImage(img, format, x, y, imgWidth, imgHeight)
        // uploadRef.value.handleRemove(image)
        addedArr.value.push(1)
    }
}
//  获取base64的格式名
const getFormat = (str) => {
    let result = ''
    let start = false
    for (let i = 0; i< str.length; i++) {
        if (start === true) {
            result += str[i]
        }
        if (str[i] === '/') {
            start = true
        }
        if (str[i] === ';' && start === true) {
            return result
        }

    }
    return result
}

const download = () => {
    // 删除第一张空白
    doc.deletePage(1)
    doc.save('test.pdf')
}
</script>

<style lang="scss">
.content{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // flex-wrap: nowrap;
    .upload-box{
        padding: 30px;
        border-radius: 10px;
        border: 2px solid var(--pink);
        .upload-demo {
            width: 800px;
            // height: 400px;
            font-size: 18px;
            transition:  all 0.2s;
            .el-upload-dragger{
                background-color: #dfdbff;
                height: 300px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .el-upload__text{
                font-size: 20px;
            }
            .el-upload__tip{
                font-size: 17px;
            }
            .el-upload-list{
                max-height: 140px;
                overflow-y: auto;
            }
        }
    }
    .download-box{
        .info {
            margin-bottom: 20px;
            font-size: 20px;
        }
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-top: 40px;
    }
}
</style>