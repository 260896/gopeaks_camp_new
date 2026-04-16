import React from 'react'

export default function ContentRender({ content }: { content: string }) {
    return (
        <div 
            className="wp-content prose prose-slate prose-lg max-w-none 
                       prose-headings:text-slate-950 prose-a:text-[#2C4ACE]"
            dangerouslySetInnerHTML={{ __html: content }} 
        />
    )
}
