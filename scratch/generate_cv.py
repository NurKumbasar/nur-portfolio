import os
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

def generate_pdf(filename):
    # A4 Page dimensions: 595.27 x 841.89
    # Usable width: 595.27 - 72 (margins) = 523.27
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    # Color Palette (Portfolyo ile uyumlu slate blue teması)
    primary_color = colors.HexColor("#3d5e82")       # Soft dark steel blue
    text_dark = colors.HexColor("#1e2a38")           # Near-black navy
    text_medium = colors.HexColor("#4a5a6a")         # Mid slate
    border_color = colors.HexColor("#d0d8e0")        # Light gray divider

    # Custom Paragraph Styles
    name_style = ParagraphStyle(
        'CVName',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=primary_color,
        alignment=1, # Centered
        spaceAfter=4
    )

    title_style = ParagraphStyle(
        'CVTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=14,
        textColor=text_medium,
        alignment=1, # Centered
        spaceAfter=8
    )

    contact_style = ParagraphStyle(
        'CVContact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=text_medium,
        alignment=1 # Centered
    )

    section_heading_style = ParagraphStyle(
        'CVSectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=primary_color,
        spaceBefore=12,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'CVBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=text_dark
    )

    body_bold_style = ParagraphStyle(
        'CVBodyBold',
        parent=body_style,
        fontName='Helvetica-Bold'
    )

    bullet_style = ParagraphStyle(
        'CVBullet',
        parent=body_style,
        leftIndent=15,
        bulletIndent=5,
        spaceAfter=2
    )

    project_title_style = ParagraphStyle(
        'CVProjectTitle',
        parent=body_style,
        fontName='Helvetica-Bold',
        textColor=primary_color,
        spaceBefore=4,
        spaceAfter=2
    )

    story = []

    # Helper function to create section headers with divider lines
    def add_section_header(title):
        p = Paragraph(title.upper(), section_heading_style)
        # Using a table as a custom divider line
        divider = Table([['']], colWidths=[523], rowHeights=[1.5])
        divider.setStyle(TableStyle([
            ('LINEBELOW', (0,0), (-1,-1), 1.5, primary_color),
            ('BOTTOMPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
        ]))
        story.append(p)
        story.append(divider)
        story.append(Spacer(1, 6))

    # --- HEADER SECTION ---
    story.append(Paragraph("Nur Kumbasar", name_style))
    story.append(Paragraph("Computer Engineering Student", title_style))
    
    contact_text = (
        "<b>Phone:</b> +90 539 400 10 70 &nbsp;&nbsp;|&nbsp;&nbsp; "
        "<b>Email:</b> nurkumbsr@gmail.com / nur.kumbasar@stu.khas.edu.tr<br/>"
        "<b>Work Authorization:</b> Turkey &nbsp;&nbsp;|&nbsp;&nbsp; "
        "<b>Location:</b> İstanbul & İzmir, Turkey"
    )
    story.append(Paragraph(contact_text, contact_style))
    story.append(Spacer(1, 8))

    # --- ABOUT ME ---
    add_section_header("About Me")
    about_text = (
        "Computer Engineering student at Kadir Has University with interests in software "
        "development, quality assurance, cybersecurity, and defense industry technologies. "
        "Passionate about learning new technologies and building practical software solutions."
    )
    story.append(Paragraph(about_text, body_style))

    # --- TECHNICAL SKILLS ---
    add_section_header("Technical Skills")
    
    skills_data = [
        [
            Paragraph("<b>Languages:</b>", body_style),
            Paragraph("Java, C++, Python", body_style)
        ],
        [
            Paragraph("<b>Tools & Technologies:</b>", body_style),
            Paragraph("Git & GitHub, MySQL, MATLAB & Simulink, Wireshark, JavaFX, Photoshop, AutoCAD", body_style)
        ],
        [
            Paragraph("<b>Concepts:</b>", body_style),
            Paragraph("Object-Oriented Programming (OOP), Software Testing & Quality Assurance, Data Structures & Algorithms", body_style)
        ]
    ]
    
    # 523 width divided: 130pt for category, 393pt for details
    skills_table = Table(skills_data, colWidths=[130, 393])
    skills_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(skills_table)

    # --- FEATURED PROJECTS ---
    add_section_header("Featured Projects")

    # Project 1
    story.append(Paragraph("GreenGrocer E-Commerce Management System", project_title_style))
    story.append(Paragraph("<i>Technologies: Java, JavaFX, MySQL</i>", body_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("Desktop-based grocery management application featuring:", body_style))
    story.append(Paragraph("&bull; User authentication & authorization control", bullet_style))
    story.append(Paragraph("&bull; Product management & inventory control", bullet_style))
    story.append(Paragraph("&bull; Interactive shopping cart & order processing workflow", bullet_style))
    story.append(Paragraph("&bull; Barcode-based product tracking", bullet_style))
    story.append(Paragraph("&bull; PDF invoice generation for checkouts", bullet_style))
    story.append(Spacer(1, 6))

    # Project 2
    story.append(Paragraph("Flip-Flop Based RAM Design and Simulation", project_title_style))
    story.append(Paragraph("<i>Technologies: MATLAB & Simulink</i>", body_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("Designed and simulated a RAM architecture including:", body_style))
    story.append(Paragraph("&bull; Memory addressing & decoder and multiplexer structures", bullet_style))
    story.append(Paragraph("&bull; Read/write operations logic validation", bullet_style))
    story.append(Paragraph("&bull; Seven-segment display outputs for visual debugging", bullet_style))
    story.append(Spacer(1, 6))

    # Project 3
    story.append(Paragraph("Data Structures & Algorithms", project_title_style))
    story.append(Paragraph("<i>Technologies: C++, Leetcode</i>", body_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("Implementation and complexity optimization of:", body_style))
    story.append(Paragraph("&bull; Linked Lists, Stacks & Queues, Trees, and Graph Algorithms", bullet_style))
    story.append(Paragraph("&bull; Complexity optimization techniques for data processing", bullet_style))

    # --- EDUCATION ---
    add_section_header("Education")
    
    edu_data = [
        [
            Paragraph("<b>Kadir Has University</b>", body_style),
            Paragraph("B.S. in Computer Engineering", body_style),
            Paragraph("2023 - 2027", ParagraphStyle('RightText', parent=body_style, alignment=2))
        ],
        [
            Paragraph("<b>Çiğli Science High School</b>", body_style),
            Paragraph("Izmir, Turkey", body_style),
            Paragraph("2019 - 2022", ParagraphStyle('RightText', parent=body_style, alignment=2))
        ]
    ]
    edu_table = Table(edu_data, colWidths=[180, 240, 103])
    edu_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(edu_table)

    # --- LINKS ---
    add_section_header("Links & Profiles")
    links_text = (
        "<b>Portfolio Website:</b> nurkumbasar.com &nbsp;&nbsp;|&nbsp;&nbsp; "
        "<b>GitHub:</b> github.com/NurKumbasar &nbsp;&nbsp;|&nbsp;&nbsp; "
        "<b>LinkedIn:</b> linkedin.com/in/nur-kumbasar"
    )
    story.append(Paragraph(links_text, contact_style))

    doc.build(story)
    print(f"Successfully generated PDF: {filename}")

if __name__ == "__main__":
    generate_pdf("../Nur_Kumbasar_CV.pdf")
