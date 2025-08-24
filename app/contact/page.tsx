'use client'
import Image from "next/image"
import { useState, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import emailjs from '@emailjs/browser';
import { z } from "zod"
import ContatImage from '../../public/contact-collage.jpg'
import './page.css'

// Zod schema for form validation
const contactFormSchema = z.object({
    name: z.string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be less than 50 characters"),
    email: z.string()
        .email("Please enter a valid email address"),
    subject: z.string()
        .min(5, "Subject must be at least 5 characters")
        .max(100, "Subject must be less than 100 characters"),
    message: z.string()
        .min(10, "Message must be at least 10 characters")
        .max(1000, "Message must be less than 1000 characters")
})

// TypeScript type derived from Zod schema
type ContactFormData = z.infer<typeof contactFormSchema>

// Type for validation errors
type FormErrors = Partial<Record<keyof ContactFormData, string>>

// Utility function to extract field errors from Zod validation
const extractFieldErrors = (error: z.ZodError): FormErrors => {
    const errors: FormErrors = {}

    // Access errors using proper typing
    const errorArray = error.issues || []

    if (Array.isArray(errorArray)) {
        errorArray.forEach((err) => {
            if (err && typeof err === 'object' && err.path && Array.isArray(err.path) && err.path.length > 0) {
                const fieldName = err.path[0] as keyof ContactFormData
                if (fieldName && err.message) {
                    errors[fieldName] = err.message
                }
            }
        })
    } 
    return errors
}

const ContactPage = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [formErrors, setFormErrors] = useState<FormErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState('')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        // Initialize EmailJS
        const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID
        if (userId) {
            emailjs.init(userId)
        }
    }, [])

    const validateField = (name: keyof ContactFormData, value: string): string => {
        try {
            // Validate individual field using Zod
            const fieldSchema = contactFormSchema.pick({ [name]: true })
            fieldSchema.parse({ [name]: value })
            return ''
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorArray = error.issues || []
                if (Array.isArray(errorArray) && errorArray.length > 0) {
                    return errorArray[0]?.message || `Invalid ${name}`
                }
            }
            return `Invalid ${name}`
        }
    }

    const validateForm = (): boolean => {
        try {
            contactFormSchema.parse(formData)
            setFormErrors({})
            return true
        } catch (error) {
            if (error instanceof z.ZodError) {
                setFormErrors(extractFieldErrors(error))
            } else {
                // Handle unexpected errors
                console.error('Unexpected validation error:', error)
                setFormErrors({ message: 'An unexpected error occurred during validation' })
            }
            return false
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        // Clear error when user starts typing
        if (formErrors[name as keyof ContactFormData]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        const error = validateField(name as keyof ContactFormData, value)
        setFormErrors(prev => ({
            ...prev,
            [name]: error
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            if (!validateForm()) {
                return
            }

            setIsSubmitting(true)
            setSubmitStatus('')

            const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
            const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
            const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID

            if (!serviceId || !templateId || !userId) {
                throw new Error('EmailJS configuration is incomplete. Please check your environment variables.')
            }

            // Include recipient email in template parameters
            const templateParams = {
                email: 'gautam.chaudhary@outside.studio',
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
                reply_to: formData.email
            }

            await emailjs.send(
                serviceId,
                templateId,
                templateParams,
                {
                    publicKey: userId
                }
            )

            setSubmitStatus('success')
            setFormData({ name: '', email: '', subject: '', message: '' })
            setFormErrors({})
            setTimeout(() => {
                setIsPopupOpen(false)
                setSubmitStatus('')
            }, 2000)
        } catch (error) {
            console.error('Email send error:', error)
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    const openPopup = () => setIsPopupOpen(true)
    const closePopup = () => {
        setIsPopupOpen(false)
        setSubmitStatus('')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setFormErrors({})
    }

    const handleEscapeKey = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape' && isPopupOpen) {
            closePopup()
        }
    }, [isPopupOpen])

    useEffect(() => {
        if (isPopupOpen) {
            document.addEventListener('keydown', handleEscapeKey)
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey)
            document.body.style.overflow = 'unset'
        }
    }, [isPopupOpen, handleEscapeKey])

    const renderPopup = () => {
        if (!mounted || !isPopupOpen) return null

        return createPortal(
            <div className="popup-overlay" onClick={closePopup}>
                <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                    <button className="popup-close" onClick={closePopup} aria-label="Close form">×</button>
                    <h2>Send us a message</h2>

                    {submitStatus === 'success' ? (
                        <div className="success-message">
                            <h3>Message sent successfully!</h3>
                            <p>We&apos;ll get back to you soon.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="contact-form" noValidate>
                            <div className="form-group">
                                <label htmlFor="name">Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={formErrors.name ? 'error' : ''}
                                    aria-describedby={formErrors.name ? 'name-error' : undefined}
                                    required
                                />
                                {formErrors.name && (
                                    <span id="name-error" className="field-error" role="alert">
                                        {formErrors.name}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={formErrors.email ? 'error' : ''}
                                    aria-describedby={formErrors.email ? 'email-error' : undefined}
                                    required
                                />
                                {formErrors.email && (
                                    <span id="email-error" className="field-error" role="alert">
                                        {formErrors.email}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Subject *</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={formErrors.subject ? 'error' : ''}
                                    aria-describedby={formErrors.subject ? 'subject-error' : undefined}
                                    required
                                />
                                {formErrors.subject && (
                                    <span id="subject-error" className="field-error" role="alert">
                                        {formErrors.subject}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={formErrors.message ? 'error' : ''}
                                    aria-describedby={formErrors.message ? 'message-error' : undefined}
                                    rows={5}
                                    required
                                />
                                <div className="field-meta">
                                    <span className={`char-count ${formData.message.length > 800 ? 'danger' :
                                            formData.message.length > 600 ? 'warning' : ''
                                        }`}>
                                        {formData.message.length}/1000 characters
                                    </span>
                                    {formErrors.message && (
                                        <span id="message-error" className="field-error" role="alert">
                                            {formErrors.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {submitStatus === 'error' && (
                                <div className="error-message" role="alert">
                                    There was an error sending your message. Please try again.
                                </div>
                            )}

                            <button
                                type="submit"
                                className="submit-button"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    )}
                </div>
            </div>,
            document.body
        )
    }

    return (
        <main id="contact" className="pageType-page">
            <div className="content--container contact--container js-fade__slow">
                <div className="row">
                    <div className="columns columns--4 columns--12--small">
                        <h1>Contact</h1>
                        <p><strong>Work Inquiries</strong><br /><a href="mailto:info@cghnyc.com" rel="noopener" target="_blank">info@cghnyc.com</a><br />212.532.4595</p>
                        <p><strong>Press Inquiries</strong><br />Christopher Nutter<br />917.770.0350<br /><a href="mailto:press@cghnyc.com" rel="noopener" target="_blank">press@cghnyc.com</a></p>
                        <p><strong>Chermayeff &amp; Geismar &amp; Haviv</strong><br />27 West 24th Street, Suite 900<br />New York, NY 10010<br /></p>
                        <p><a href="https://twitter.com/cghnyc" rel="noopener" target="_blank">Twitter</a><br /><a href="https://www.instagram.com/chermayeff_geismar_haviv/" rel="noopener" target="_blank">Instagram</a><br /><a href="https://www.facebook.com/cghnyc" rel="noopener" target="_blank">Facebook</a></p>

                        {/* Call to Action Button */}
                        <div className="cta-section">
                            <button
                                className="cta-button"
                                onClick={openPopup}
                                aria-haspopup="dialog"
                                aria-expanded={isPopupOpen}
                            >
                                Send us a message
                            </button>
                        </div>
                    </div>
                    <div className="columns columns--8 columns--12--small">
                        <Image src={ContatImage} alt="Ivan Chermayeff - Il Furioso" />
                    </div>
                </div>
            </div>

            {/* Popup Form Portal */}
            {renderPopup()}
        </main>
    )
}

export default ContactPage