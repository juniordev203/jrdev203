import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File

        if (!file) {
            return NextResponse.json({ success: false, error: 'Không có file được tải lên' })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Tạo đường dẫn lưu file
        const uploadDir = join(process.cwd(), 'public/uploads')
        const fileName = `${Date.now()}-${file.name}`
        const filePath = join(uploadDir, fileName)
    
        // Lưu file
        await writeFile(filePath, buffer)
    
        return NextResponse.json({ 
          success: true, 
          data: {
            fileName,
            originalName: file.name,
            size: file.size,
            type: file.type,
            url: `/uploads/${fileName}`
          }
        })
      } catch (error) {
        return NextResponse.json({ success: false, error: 'Lỗi khi upload file' })
      }
    }