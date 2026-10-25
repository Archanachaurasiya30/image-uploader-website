import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [caption, setCaption] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')
  const [error, setError] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!selectedFile) {
      setError('Choose an image before uploading.')
      return
    }

    setError('')
    setIsUploading(true)
    const formData = new FormData()
    formData.append('image', selectedFile)
    formData.append('caption', caption)

    try {
      const response = await fetch('/api/create-post', {
        method: 'POST',
        body: formData,
      })
      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(result.message || 'Your image could not be uploaded.')
      }

      navigate('/feed')
    } catch (uploadError) {
      setError(uploadError.message || 'Your image could not be uploaded.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <main className='create-post-section'>
      <div className='page-intro'>
        <p className='eyebrow'>A place for your good things</p>
        <h1>Make a moment <span>last.</span></h1>
        <p className='intro-copy'>Add a photograph and a few words to your collection.</p>
      </div>

      <div className='composer-panel'>
        <form className='upload-form' onSubmit={handleSubmit}>
          <label className='upload-dropzone' htmlFor='post-image'>
            <span className='dropzone-symbol' aria-hidden='true'>+</span>
            <span className='dropzone-title'>Choose an image</span>
            <span className='dropzone-hint'>JPG, PNG, GIF or WebP</span>
            <input
              id='post-image'
              className='upload-input'
              type='file'
              name='image'
              accept='image/*'
              onChange={(event) => {
                const file = event.target.files?.[0] || null
                setSelectedFile(file)
                setPreviewUrl(file ? URL.createObjectURL(file) : '')
                setError('')
              }}
            />
          </label>

          <label className='caption-field'>
            <span>Caption</span>
            <input
              type='text'
              name='caption'
              placeholder='A little context for this moment...'
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
              required
            />
          </label>

          {error && <p className='form-error' role='alert'>{error}</p>}

          <button className='upload-button' type='submit' disabled={isUploading}>
            {isUploading ? 'Uploading...' : 'Share to gallery'}
            <span aria-hidden='true'>↗</span>
          </button>
        </form>

        <aside className='preview-panel' aria-live='polite'>
          <div className='preview-heading'>
            <span className='preview-label'>Image preview</span>
            {selectedFile && <span className='preview-status'>Ready</span>}
          </div>
          <div className={`preview-frame${previewUrl ? ' has-preview' : ''}`}>
            {previewUrl ? (
              <img src={previewUrl} alt='Selected image preview' />
            ) : (
              <div className='preview-empty'>
                <span className='preview-empty-mark' aria-hidden='true'>✳</span>
                <span>Your image will appear here</span>
              </div>
            )}
          </div>
          {selectedFile && <p className='file-name'>{selectedFile.name}</p>}
        </aside>
      </div>
    </main>
  )
}

export default CreatePost
