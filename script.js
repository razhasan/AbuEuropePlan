(() => {
  'use strict';

  /* ===================== CONFIG ===================== */
  const TRIP_START = new Date(2026, 7, 10, 18, 10);  // Aug 10 2026, 18:10 — landing at CGN
  const TRIP_END   = new Date(2026, 9, 19, 19, 0);   // Oct 19 2026, 19:00 — return flight
  const Abdullah_WEEKS = 1; // fixed

  const COLORS = {
    sisterFirst: '#1E88E5',
    withYou: '#FF5A5F',
    Abdullah: '#7C4DFF',
    sisterFinal: '#FFC93C'
  };

  const state = {
    sisterFirst: 1,
    withYou: 4,
    sisterFinal: 4
  };

  /* ===================== LANGUAGE ===================== */
  let LANG = 'en'; // always starts in English by default

  const STRINGS = {
    en: {
      page_title: "Abu's Europe Trip · Aug – Oct 2026",
      nav_brand: "🧳 Abu's Europe Journey",
      nav_planner: 'Planner', nav_timeline: 'Timeline', nav_calendar: 'Calendar', nav_guide: 'Paris Guide',
      nav_dayplan: 'Day Plan', nav_gallery: 'Gallery', nav_souvenirs: 'Souvenirs', nav_approval: 'Approval',

      hero_title: "Abu's Europe Visit",
      hero_subtitle_html: 'Cologne Bonn → Bonn (Busrah) → Verneuil-en-Halatte, Paris (us) → Stuttgart (Abdullah) → Bonn (Busrah) → home.<br>10 August – 19 October 2026',
      cd_days: 'Days', cd_hours: 'Hours', cd_mins: 'Minutes', cd_secs: 'Seconds',
      route_stops: ['CGN Airport', 'Bonn (Busrah)', 'Paris (You)', 'Stuttgart (Abdullah)', 'Bonn (Busrah)', 'Flight Home'],

      step1: 'Step 1', step2: 'Step 2', step3: 'Step 3', step4: 'Step 4', step5: 'Step 5', step6: 'Step 6', step7: 'Step 7', step8: 'Step 8',

      planner_h2: 'Trip Duration Planner',
      planner_intro: "Landing (Aug 10, 18:10) and the return flight (Oct 19, 19:00) are fixed — that's exactly 10 weeks. One week with your Abdullah in Stuttgart is fixed too. Drag the sliders below to divide the remaining 9 weeks between Busrah's first stay, your stay in Paris, and Busrah's final stay — every date on this page updates instantly.",
      planner_field_sisterFirst_label: 'Bonn — Arrival stay (Busrah)',
      planner_field_sisterFirst_hint: 'Right after landing, before heading to Paris',
      planner_field_withYou_label: 'Paris / Verneuil-en-Halatte (You)',
      planner_field_withYou_hint: 'Rest week + sightseeing',
      planner_field_Abdullah_label: 'Stuttgart — Abdullah',
      planner_field_Abdullah_value: '1 week',
      planner_field_Abdullah_hint: 'Fixed as requested',
      planner_field_sisterFinal_label: 'Bonn — Final stay (Busrah)',
      planner_field_sisterFinal_hint: 'Until the Oct 19 flight home',
      week_singular: 'week', week_plural: 'weeks',
      planner_status_ok: '✓ Lines up perfectly with the Oct 19 return flight ({weeks} weeks total).',
      planner_status_over: '⚠ This combination runs {days} day(s) past the Oct 19 return flight. Reduce one of the durations above.',
      planner_status_under: '⚠ This combination finishes {days} day(s) before the Oct 19 return flight. Add more days above.',
      planner_sum_total: 'Total weeks', planner_sum_days: 'Total days', planner_sum_sister: 'Weeks w/ Busrah',
      planner_sum_you: 'Weeks w/ You', planner_sum_end: 'Calculated return',

      timeline_h2: 'Interactive Timeline',
      timeline_intro: 'Click any stop to expand the details. Dates recompute live from the planner above.',
      leg_sisterFirst_name: 'Bonn — Arrival stay with Busrah',
      leg_sisterFirst_detail: 'Landing at Cologne Bonn Airport at 18:10 on {date}, picked up by Busrah. Rest and settle in before the trip to Paris.',
      leg_withYou_name: 'Paris / Verneuil-en-Halatte — with you',
      leg_withYou_detail: 'Travel by train from Bonn to Paris (car as backup option), picked up by you. First week is rest, then Paris sightseeing — see the Day-by-Day Plan section below.',
      leg_Abdullah_name: 'Stuttgart — with your Abdullah',
      leg_Abdullah_detail: 'Travel by train from Paris to Stuttgart. One week staying with your Abdullah.',
      leg_sisterFinal_name: 'Bonn — Final stay with Busrah',
      leg_sisterFinal_detail: 'Back to Bonn by train from Stuttgart. Final stretch before the return flight home on {date} at 19:00.',

      calendar_h2: 'Full Calendar View',
      calendar_intro: "August, September and October 2026 at a glance, color-coded by who he's staying with.",
      month_names: ['January','February','March','April','May','June','July','August','September','October','November','December'],
      dow_short: ['M','T','W','T','F','S','S'],

      guide_h2: 'Paris Sightseeing Guide',
      guide_intro: "He's already seen the Eiffel Tower, La Défense, the Bateau Mouche cruise, the Champs-Élysées, the Arc de Triomphe and Trocadéro Gardens. Here are fresh places to make this visit even more memorable — filter by type below.",
      cat_all: 'All', cat_culture: 'Culture', cat_view: 'Views', cat_museum: 'Museums', cat_walk: 'Easy Walks', cat_daytrip: 'Day Trip',
      badge_new: 'New', badge_revisit: 'Revisit',
      add_photo_btn: '+ Add Photo', edit_photo_btn: '✎ Edit Photo', edit_btn_short: '✎ Edit',
      no_places_msg: 'No places in this category.',

      dayplan_h2: 'Suggested Day-by-Day Plan',
      dayplan_intro: 'Auto-generated from your Paris stay length: a settle-in rest week, then sightseeing days alternated with rest days so it stays comfortable and unhurried.',
      day_arrival: 'Arrival at your home — welcome dinner, no plans, just family time.',
      day_rest_recover: 'Rest day — recover from travel, walk around the neighbourhood, home-cooked meals.',
      day_free: 'Free day — optional revisit of a favourite spot, shopping, or simply relaxing at home.',
      day_rest_between: 'Rest day between outings — keep the pace comfortable.',
      outing_template: '{emoji} Visit <strong>{name}</strong> — {desc} (Best time: {best}, ~{duration}).',
      tag_outing: 'Outing', tag_rest: 'Rest',
      day_label: 'Day {n}',
      increase_duration_msg: 'Increase the "Paris / Verneuil-en-Halatte" duration in the planner to generate a day plan.',

      gallery_h2: 'Photo Gallery',
      gallery_intro_html: "Drop real photos into the <code>/images</code> folder using the filenames below and they'll appear automatically — until then, placeholder icons are shown.",
      tab_new: 'New Places to Visit', tab_visited: 'Already Visited',

      souvenirs_h2: 'Souvenirs',
      souvenirs_static_h3: 'Permanent Souvenir Photos',
      souvenirs_static_intro_html: 'Added directly to the <code>images/souvenirs</code> folder in the GitHub repo — visible to everyone who visits the site.',
      souvenirs_static_empty: 'No permanent souvenir photos yet — add files named souvenir1.jpg, souvenir2.jpg, etc. to images/souvenirs on GitHub to see them here.',
      souvenirs_personal_h3: 'Your Own Additions (this device only)',
      souvenirs_intro: 'A place to keep a photo record of souvenirs picked up along the way — one category per place or theme (e.g. "Eiffel Tower", "Garden"), with as many photos as you like inside each. Saved right on this device, like a WhatsApp media folder.',
      add_category_btn: '+ Add Category', export_backup_btn: '⬇ Export Backup', import_backup_btn: '⬆ Import Backup',
      souvenir_empty: 'No categories yet — click "+ Add Category" above to start keeping a photo record (e.g. "Eiffel Tower", "Garden").',
      souvenir_add_photo: '+ Add Photo',
      category_prompt: 'Category name (e.g. "Eiffel Tower", "Garden"):',
      caption_prompt: 'Optional caption for this photo (leave blank to skip):',
      confirm_delete_category: 'Delete this whole category and its photos?',
      delete_category_title: 'Delete category', delete_photo_title: 'Delete photo',
      backup_restored_alert: 'Backup restored successfully.',
      backup_invalid_alert: "Could not read that backup file — make sure it's an export from this page.",

      approval_h2: 'Family Approval',
      approval_intro_html: "Rate the plan and mark your approval. Saved on this device/browser. <em>Note: since this is a simple offline page, approvals don't sync automatically between different phones — each person approves on the device they're viewing from, or you can share a screenshot.</em>",
      person_you: 'You', person_busrah: 'Busrah', person_Abdullah: 'Abdullah',
      approve_btn: 'Approve Plan', approved_btn: '✓ Approved', saved_device_note: 'Saved on this device only',
      overall_all_approved: '🎉 Everyone has approved the plan!',
      overall_partial: '{count} of {total} family members have approved so far.',

      footer_stats: '{days} days across 3 cities (Bonn, Paris/Verneuil-en-Halatte, Stuttgart) · {sisterWeeks} weeks with Busrah · {youWeeks} weeks with you · {AbdullahWeeks} week with Abdullah.',
      footer_tagline: "Made with love for Abu's big Europe adventure ✈️",

      modal_title_default: 'Add Image', modal_title_for: 'Photo for {name}',
      modal_tab_url: 'Paste URL', modal_tab_file: 'Upload from Device',
      modal_file_drop_text: 'Tap to choose a photo from your device',
      modal_remove_btn: 'Remove Image', modal_save_btn: 'Save',
      modal_no_image: 'No image set — the {emoji} placeholder is showing.',
      modal_no_image_alert: 'Please paste an image URL or choose a photo from your device first.'
    },
    ur: {
      page_title: 'ابو کا یورپ سفر · اگست – اکتوبر 2026',
      nav_brand: '🧳 ابو کا یورپ سفر',
      nav_planner: 'منصوبہ ساز', nav_timeline: 'ٹائم لائن', nav_calendar: 'کیلنڈر', nav_guide: 'پیرس گائیڈ',
      nav_dayplan: 'روزانہ منصوبہ', nav_gallery: 'گیلری', nav_souvenirs: 'یادگاریں', nav_approval: 'منظوری',

      hero_title: 'ابو کا یورپ کا سفر',
      hero_subtitle_html: 'کولون بون → بون (بشریٰ) → ورنوے آں ہالات، پیرس (ہمارے ہاں) → سٹٹگارٹ (عبداللہ) → بون (بشریٰ) → گھر واپسی۔<br>10 اگست – 19 اکتوبر 2026',
      cd_days: 'دن', cd_hours: 'گھنٹے', cd_mins: 'منٹ', cd_secs: 'سیکنڈ',
      route_stops: ['کولون بون ایئرپورٹ', 'بون (بشریٰ)', 'پیرس (آپ)', 'سٹٹگارٹ (عبداللہ)', 'بون (بشریٰ)', 'واپسی پرواز'],

      step1: 'قدم 1', step2: 'قدم 2', step3: 'قدم 3', step4: 'قدم 4', step5: 'قدم 5', step6: 'قدم 6', step7: 'قدم 7', step8: 'قدم 8',

      planner_h2: 'سفر کے دورانیے کا منصوبہ',
      planner_intro: 'پہنچنے کا وقت (10 اگست، 18:10) اور واپسی کی پرواز (19 اکتوبر، 19:00) طے شدہ ہیں — یعنی مکمل 10 ہفتے۔ سٹٹگارٹ میں عبداللہ کے پاس ایک ہفتہ بھی طے ہے۔ نیچے دیے گئے سلائیڈرز کو حرکت دے کر باقی 9 ہفتے بشریٰ کے پاس پہلے قیام، پیرس میں آپ کے پاس قیام، اور بشریٰ کے پاس آخری قیام کے درمیان تقسیم کریں — اس صفحے کی ہر تاریخ فوراً اپ ڈیٹ ہو جائے گی۔',
      planner_field_sisterFirst_label: 'بون — آمد پر قیام (بشریٰ)',
      planner_field_sisterFirst_hint: 'پہنچنے کے فوراً بعد، پیرس جانے سے پہلے',
      planner_field_withYou_label: 'پیرس / ورنوے آں ہالات (آپ)',
      planner_field_withYou_hint: 'آرام کا ہفتہ + سیر و تفریح',
      planner_field_Abdullah_label: 'سٹٹگارٹ — عبداللہ',
      planner_field_Abdullah_value: '1 ہفتہ',
      planner_field_Abdullah_hint: 'درخواست کے مطابق طے شدہ',
      planner_field_sisterFinal_label: 'بون — آخری قیام (بشریٰ)',
      planner_field_sisterFinal_hint: '19 اکتوبر کی واپسی پرواز تک',
      week_singular: 'ہفتہ', week_plural: 'ہفتے',
      planner_status_ok: '✓ یہ 19 اکتوبر کی واپسی پرواز سے بالکل درست میل کھاتا ہے (کل {weeks} ہفتے)۔',
      planner_status_over: '⚠ یہ ترتیب 19 اکتوبر کی واپسی پرواز سے {days} دن آگے نکل جاتی ہے۔ اوپر کسی دورانیے کو کم کریں۔',
      planner_status_under: '⚠ یہ ترتیب 19 اکتوبر کی واپسی پرواز سے {days} دن پہلے ختم ہو جاتی ہے۔ اوپر مزید دن شامل کریں۔',
      planner_sum_total: 'کل ہفتے', planner_sum_days: 'کل دن', planner_sum_sister: 'بشریٰ کے ساتھ ہفتے',
      planner_sum_you: 'آپ کے ساتھ ہفتے', planner_sum_end: 'حساب شدہ واپسی',

      timeline_h2: 'انٹرایکٹو ٹائم لائن',
      timeline_intro: 'تفصیلات دیکھنے کے لیے کسی بھی سٹاپ پر کلک کریں۔ تاریخیں اوپر دیے گئے منصوبہ ساز سے فوری اپ ڈیٹ ہوتی ہیں۔',
      leg_sisterFirst_name: 'بون — بشریٰ کے ہاں آمد پر قیام',
      leg_sisterFirst_detail: '{date} کو 18:10 بجے کولون بون ایئرپورٹ پر پہنچنا، بشریٰ کی جانب سے استقبال۔ پیرس جانے سے پہلے آرام اور سکون۔',
      leg_withYou_name: 'پیرس / ورنوے آں ہالات — آپ کے ساتھ',
      leg_withYou_detail: 'بون سے پیرس تک ٹرین کا سفر (متبادل کے طور پر گاڑی)، آپ کی جانب سے استقبال۔ پہلا ہفتہ آرام کا، پھر پیرس کی سیر — نیچے روزانہ منصوبہ دیکھیں۔',
      leg_Abdullah_name: 'سٹٹگارٹ — عبداللہ کے ساتھ',
      leg_Abdullah_detail: 'پیرس سے سٹٹگارٹ تک ٹرین کا سفر۔ عبداللہ کے ساتھ ایک ہفتہ قیام۔',
      leg_sisterFinal_name: 'بون — بشریٰ کے ہاں آخری قیام',
      leg_sisterFinal_detail: 'سٹٹگارٹ سے ٹرین کے ذریعے واپس بون۔ {date} کو 19:00 بجے واپسی پرواز سے پہلے آخری مرحلہ۔',

      calendar_h2: 'مکمل کیلنڈر منظر',
      calendar_intro: 'اگست، ستمبر اور اکتوبر 2026 ایک نظر میں، قیام کی جگہ کے حساب سے رنگوں میں۔',
      month_names: ['جنوری','فروری','مارچ','اپریل','مئی','جون','جولائی','اگست','ستمبر','اکتوبر','نومبر','دسمبر'],
      dow_short: ['پیر','منگل','بدھ','جمعرات','جمعہ','ہفتہ','اتوار'],

      guide_h2: 'پیرس سیر کی گائیڈ',
      guide_intro: 'وہ پہلے ہی ایفل ٹاور، لا ڈیفانس، باتو موش کروز، شانزے لیزے، آرک دی تریومف اور تروکادیرو باغات دیکھ چکے ہیں۔ اس بار سفر کو مزید یادگار بنانے کے لیے کچھ نئی جگہیں یہ رہیں — نیچے قسم کے مطابق فلٹر کریں۔',
      cat_all: 'تمام', cat_culture: 'ثقافت', cat_view: 'نظارے', cat_museum: 'عجائب گھر', cat_walk: 'آسان سیر', cat_daytrip: 'دن کا سفر',
      badge_new: 'نیا', badge_revisit: 'دوبارہ ملاحظہ',
      add_photo_btn: '+ تصویر شامل کریں', edit_photo_btn: '✎ تصویر میں تبدیلی', edit_btn_short: '✎ ترمیم',
      no_places_msg: 'اس زمرے میں کوئی جگہ نہیں۔',

      dayplan_h2: 'تجویز کردہ روزانہ منصوبہ',
      dayplan_intro: 'آپ کے پیرس میں قیام کی مدت کے حساب سے خودکار ترتیب: ابتدائی آرام کا ہفتہ، پھر سیر کے دن آرام کے دنوں کے ساتھ باری باری تاکہ سفر آرام دہ اور بے فکر رہے۔',
      day_arrival: 'آپ کے گھر پہنچنا — خوش آمدید عشائیہ، کوئی پروگرام نہیں، صرف خاندان کے ساتھ وقت۔',
      day_rest_recover: 'آرام کا دن — سفر کی تھکاوٹ اتاریں، محلے میں چہل قدمی، گھر کا پکا کھانا۔',
      day_free: 'خالی دن — کسی پسندیدہ جگہ کا اختیاری دوبارہ وزٹ، خریداری، یا بس گھر پر آرام۔',
      day_rest_between: 'سیر کے درمیان آرام کا دن — رفتار آرام دہ رکھیں۔',
      outing_template: '{emoji} <strong>{name}</strong> کی سیر — {desc} (بہترین وقت: {best}، تقریباً {duration})۔',
      tag_outing: 'سیر', tag_rest: 'آرام',
      day_label: 'دن {n}',
      increase_duration_msg: 'روزانہ منصوبہ بنانے کے لیے اوپر منصوبہ ساز میں "پیرس / ورنوے آں ہالات" کا دورانیہ بڑھائیں۔',

      gallery_h2: 'تصویری گیلری',
      gallery_intro_html: '<code>/images</code> فولڈر میں نیچے دیے گئے ناموں کے مطابق اصل تصاویر ڈالیں تو وہ خودکار طور پر نظر آئیں گی — اس وقت تک نمائندہ آئیکن دکھائے جا رہے ہیں۔',
      tab_new: 'دیکھنے کے لیے نئی جگہیں', tab_visited: 'پہلے دیکھی گئی جگہیں',

      souvenirs_h2: 'یادگاریں',
      souvenirs_static_h3: 'مستقل یادگار تصاویر',
      souvenirs_static_intro_html: '<code>images/souvenirs</code> فولڈر میں براہ راست شامل کی گئیں — سائٹ پر آنے والے ہر شخص کو نظر آتی ہیں۔',
      souvenirs_static_empty: 'ابھی تک کوئی مستقل یادگار تصویر نہیں — گٹ ہب پر images/souvenirs میں souvenir1.jpg، souvenir2.jpg وغیرہ ناموں سے فائلیں شامل کریں تاکہ یہ یہاں نظر آئیں۔',
      souvenirs_personal_h3: 'آپ کی اپنی شامل کردہ تصاویر (صرف اس ڈیوائس پر)',
      souvenirs_intro: 'راستے میں لی گئی یادگاروں کی تصویری ریکارڈ رکھنے کی جگہ — ہر جگہ یا موضوع کے لیے ایک زمرہ (مثلاً "ایفل ٹاور"، "باغ")، جس میں آپ جتنی چاہیں تصاویر رکھ سکتے ہیں۔ بالکل اسی ڈیوائس پر محفوظ، واٹس ایپ میڈیا فولڈر کی طرح۔',
      add_category_btn: '+ زمرہ شامل کریں', export_backup_btn: '⬇ بیک اپ ایکسپورٹ کریں', import_backup_btn: '⬆ بیک اپ درآمد کریں',
      souvenir_empty: 'ابھی تک کوئی زمرہ نہیں — تصویری ریکارڈ شروع کرنے کے لیے اوپر "+ زمرہ شامل کریں" پر کلک کریں (مثلاً "ایفل ٹاور"، "باغ")۔',
      souvenir_add_photo: '+ تصویر شامل کریں',
      category_prompt: 'زمرے کا نام (مثلاً "ایفل ٹاور"، "باغ"):',
      caption_prompt: 'اس تصویر کے لیے اختیاری کیپشن (خالی چھوڑ سکتے ہیں):',
      confirm_delete_category: 'کیا یہ پورا زمرہ اور اس کی تصاویر حذف کر دی جائیں؟',
      delete_category_title: 'زمرہ حذف کریں', delete_photo_title: 'تصویر حذف کریں',
      backup_restored_alert: 'بیک اپ کامیابی سے بحال ہو گیا۔',
      backup_invalid_alert: 'یہ بیک اپ فائل پڑھی نہیں جا سکی — یقینی بنائیں کہ یہ اسی صفحے سے ایکسپورٹ کی گئی ہے۔',

      approval_h2: 'خاندانی منظوری',
      approval_intro_html: 'منصوبے کو ریٹ کریں اور اپنی منظوری درج کریں۔ اس ڈیوائس/براؤزر پر محفوظ ہوتا ہے۔ <em>نوٹ: چونکہ یہ ایک سادہ آف لائن صفحہ ہے، منظوریاں مختلف فونز کے درمیان خودکار مطابقت پذیر نہیں ہوتیں — ہر فرد اپنے دیکھنے والے ڈیوائس پر منظوری دے، یا اسکرین شاٹ شیئر کریں۔</em>',
      person_you: 'آپ', person_busrah: 'بشریٰ', person_Abdullah: 'عبداللہ',
      approve_btn: 'منصوبہ منظور کریں', approved_btn: '✓ منظور شدہ', saved_device_note: 'صرف اس ڈیوائس پر محفوظ',
      overall_all_approved: '🎉 سب نے منصوبہ منظور کر لیا ہے!',
      overall_partial: 'اب تک {total} میں سے {count} خاندان کے افراد نے منظوری دی ہے۔',

      footer_stats: '3 شہروں (بون، پیرس/ورنوے آں ہالات، سٹٹگارٹ) میں {days} دن · بشریٰ کے ساتھ {sisterWeeks} ہفتے · آپ کے ساتھ {youWeeks} ہفتے · عبداللہ کے ساتھ {AbdullahWeeks} ہفتہ۔',
      footer_tagline: 'ابو کے یورپ کے بڑے سفر کے لیے محبت سے تیار کیا گیا ✈️',

      modal_title_default: 'تصویر شامل کریں', modal_title_for: '{name} کی تصویر',
      modal_tab_url: 'لنک چسپاں کریں', modal_tab_file: 'ڈیوائس سے اپ لوڈ کریں',
      modal_file_drop_text: 'ڈیوائس سے تصویر منتخب کرنے کے لیے تھپتھپائیں',
      modal_remove_btn: 'تصویر ہٹائیں', modal_save_btn: 'محفوظ کریں',
      modal_no_image: 'کوئی تصویر مقرر نہیں — {emoji} نمائندہ نشان دکھایا جا رہا ہے۔',
      modal_no_image_alert: 'براہ کرم پہلے تصویر کا لنک چسپاں کریں یا ڈیوائس سے تصویر منتخب کریں۔'
    }
  };

  function t(key, vars) {
    const dict = STRINGS[LANG] || STRINGS.en;
    let str = key in dict ? dict[key] : (key in STRINGS.en ? STRINGS.en[key] : key);
    if (vars) {
      Object.keys(vars).forEach(k => {
        str = str.replace(new RegExp('\\{' + k + '\\}', 'g'), vars[k]);
      });
    }
    return str;
  }

  function tArr(key) {
    const dict = STRINGS[LANG] || STRINGS.en;
    return dict[key] || STRINGS.en[key] || [];
  }

  function applyStaticTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = t(el.dataset.i18n);
    });
    const heroSubtitle = document.getElementById('heroSubtitle');
    if (heroSubtitle) heroSubtitle.innerHTML = t('hero_subtitle_html');
    const galleryIntro = document.getElementById('galleryIntro');
    if (galleryIntro) galleryIntro.innerHTML = t('gallery_intro_html');
    const approvalIntro = document.getElementById('approvalIntro');
    if (approvalIntro) approvalIntro.innerHTML = t('approval_intro_html');
    const souvenirsStaticIntro = document.getElementById('souvenirsStaticIntro');
    if (souvenirsStaticIntro) souvenirsStaticIntro.innerHTML = t('souvenirs_static_intro_html');
    document.title = t('page_title');
  }

  function setLang(lang) {
    LANG = lang;
    document.documentElement.setAttribute('lang', lang === 'ur' ? 'ur' : 'en');
    document.documentElement.setAttribute('dir', lang === 'ur' ? 'rtl' : 'ltr');
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
    applyStaticTranslations();
    renderEverything();
  }

  function initLangSwitch() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });
  }

  /* ===================== PLACES DATA ===================== */
  const PLACES = [
    { id: 'eiffel', visited: true, category: 'view', emoji: '🗼', img: 'images/eiffel-tower.jpg',
      i18n: {
        en: { name: 'Eiffel Tower', desc: 'Already visited — a great spot to revisit at night when it sparkles on the hour.', duration: '2-3 hrs', best: 'Evening' },
        ur: { name: 'ایفل ٹاور', desc: 'پہلے دیکھا جا چکا ہے — رات کو جب یہ ہر گھنٹے چمکتا ہے تو دوبارہ دیکھنے کی بہترین جگہ۔', duration: '2-3 گھنٹے', best: 'شام' }
      } },
    { id: 'ladefense', visited: true, category: 'walk', emoji: '🏙️', img: 'images/la-defense.jpg',
      i18n: {
        en: { name: 'La Défense', desc: "Already visited — Paris's modern skyline and the Grande Arche.", duration: '2 hrs', best: 'Afternoon' },
        ur: { name: 'لا ڈیفانس', desc: 'پہلے دیکھا جا چکا ہے — پیرس کی جدید عمارتیں اور گرینڈ آرش۔', duration: '2 گھنٹے', best: 'دوپہر' }
      } },
    { id: 'bateaumouche', visited: true, category: 'view', emoji: '🚤', img: 'images/bateau-mouche.jpg',
      i18n: {
        en: { name: 'Bateau Mouche (Seine Cruise)', desc: "Already visited — the classic river cruise past Paris's landmarks.", duration: '1 hr', best: 'Evening' },
        ur: { name: 'باتو موش (دریائے سین کروز)', desc: 'پہلے دیکھا جا چکا ہے — پیرس کے مشہور مقامات کے پاس سے کلاسیکی دریائی کروز۔', duration: '1 گھنٹہ', best: 'شام' }
      } },
    { id: 'champs', visited: true, category: 'walk', emoji: '🛍️', img: 'images/champs-elysees.jpg',
      i18n: {
        en: { name: 'Champs-Élysées', desc: 'Already visited — the grand avenue of shops and cafés.', duration: '2 hrs', best: 'Afternoon' },
        ur: { name: 'شانزے لیزے', desc: 'پہلے دیکھا جا چکا ہے — دکانوں اور کیفوں کی شاندار سڑک۔', duration: '2 گھنٹے', best: 'دوپہر' }
      } },
    { id: 'sacrecoeur', visited: false, category: 'culture', emoji: '⛪', img: 'images/sacre-coeur.jpg',
      i18n: {
        en: { name: 'Sacré-Cœur & Montmartre', desc: "A hilltop basilica with the best panoramic view of Paris, plus the artists' square of Montmartre.", duration: '3 hrs', best: 'Morning' },
        ur: { name: 'ساکرے کور اور مونمارتغ', desc: 'پہاڑی پر واقع گرجا گھر جہاں سے پیرس کا بہترین نظارہ ملتا ہے، ساتھ ہی مونمارتغ کا مصوروں کا چوک۔', duration: '3 گھنٹے', best: 'صبح' }
      } },
    { id: 'notredame', visited: false, category: 'culture', emoji: '🕍', img: 'images/notre-dame.jpg',
      i18n: {
        en: { name: 'Notre-Dame & Sainte-Chapelle', desc: 'The newly reopened cathedral and the jewel-box stained-glass chapel nearby on Île de la Cité.', duration: '2-3 hrs', best: 'Morning' },
        ur: { name: 'نوتردام اور سینت شاپیل', desc: 'نئے سرے سے کھلنے والا مشہور گرجا گھر اور اس کے قریب رنگین شیشوں والا خوبصورت چیپل۔', duration: '2-3 گھنٹے', best: 'صبح' }
      } },
    { id: 'arc', visited: true, category: 'view', emoji: '🏛️', img: 'images/arc-de-triomphe.jpg',
      i18n: {
        en: { name: 'Arc de Triomphe', desc: 'Already visited — the rooftop view straight down the Champs-Élysées.', duration: '1-2 hrs', best: 'Late afternoon' },
        ur: { name: 'آرک دی تریومف', desc: 'پہلے دیکھا جا چکا ہے — چھت سے سیدھا شانزے لیزے کا خوبصورت نظارہ۔', duration: '1-2 گھنٹے', best: 'سہ پہر' }
      } },
    { id: 'trocadero', visited: true, category: 'view', emoji: '🌳', img: 'images/trocadero.jpg',
      i18n: {
        en: { name: 'Trocadéro Gardens', desc: 'Already visited — the postcard view of the Eiffel Tower from across the river.', duration: '1 hr', best: 'Golden hour' },
        ur: { name: 'تروکادیرو باغات', desc: 'پہلے دیکھا جا چکا ہے — دریا کے پار سے ایفل ٹاور کا خوبصورت نظارہ۔', duration: '1 گھنٹہ', best: 'غروب آفتاب کے قریب' }
      } },
    { id: 'louvre', visited: false, category: 'museum', emoji: '🖼️', img: 'images/louvre.jpg',
      i18n: {
        en: { name: 'Louvre Museum', desc: "The world's most famous museum — even a short visit to see the Mona Lisa and the glass pyramid is memorable.", duration: '3-4 hrs', best: 'Morning' },
        ur: { name: 'لوور میوزیم', desc: 'دنیا کا مشہور ترین عجائب گھر — مونا لیزا اور شیشے کے اہرام کو دیکھنے کے لیے مختصر وزٹ بھی یادگار ہے۔', duration: '3-4 گھنٹے', best: 'صبح' }
      } },
    { id: 'orsay', visited: false, category: 'museum', emoji: '🎨', img: 'images/orsay.jpg',
      i18n: {
        en: { name: "Musée d'Orsay", desc: 'A grand former railway station full of Impressionist masterpieces — smaller and calmer than the Louvre.', duration: '2-3 hrs', best: 'Morning' },
        ur: { name: 'میوزے دورسے', desc: 'ایک سابقہ ریلوے اسٹیشن جو تاثراتی فن پاروں سے بھرا ہوا ہے — لوور کے مقابلے میں چھوٹا اور پرسکون۔', duration: '2-3 گھنٹے', best: 'صبح' }
      } },
    { id: 'latin', visited: false, category: 'culture', emoji: '📚', img: 'images/latin-quarter.jpg',
      i18n: {
        en: { name: 'Latin Quarter & Panthéon', desc: "Historic student quarter, narrow streets, and the domed Panthéon resting place of France's great figures.", duration: '2-3 hrs', best: 'Afternoon' },
        ur: { name: 'لاطینی محلہ اور پینتھیون', desc: 'طلبہ کا تاریخی علاقہ، تنگ گلیاں، اور گنبد والا پینتھیون جہاں فرانس کی عظیم شخصیات آرام فرما ہیں۔', duration: '2-3 گھنٹے', best: 'دوپہر' }
      } },
    { id: 'luxembourg', visited: false, category: 'walk', emoji: '🌷', img: 'images/luxembourg-gardens.jpg',
      i18n: {
        en: { name: 'Luxembourg Gardens', desc: 'A gentle, beautiful park to relax in — fountains, tree-lined paths, easy on the legs.', duration: '1-2 hrs', best: 'Late morning' },
        ur: { name: 'لکسمبرگ باغات', desc: 'آرام کرنے کے لیے ایک خوبصورت اور پرسکون باغ — فوارے، درختوں والے راستے، چلنے میں آسان۔', duration: '1-2 گھنٹے', best: 'دیر صبح' }
      } },
    { id: 'versailles', visited: false, category: 'daytrip', emoji: '👑', img: 'images/versailles.jpg',
      i18n: {
        en: { name: 'Palace of Versailles', desc: 'A full day trip to the opulent royal palace and gardens just outside Paris — book ahead, wear comfortable shoes.', duration: 'Full day', best: 'Early morning start' },
        ur: { name: 'محل ورسائی', desc: 'پیرس کے قریب شاہی محل اور باغات کا مکمل دن کا سفر — پہلے سے بکنگ کریں اور آرام دہ جوتے پہنیں۔', duration: 'پورا دن', best: 'صبح سویرے آغاز' }
      } }
  ];

  function placeText(place) {
    return place.i18n[LANG] || place.i18n.en;
  }

  const CATEGORY_ORDER = ['all', 'culture', 'view', 'museum', 'walk', 'daytrip'];
  const CATEGORY_KEYS = { all: 'cat_all', culture: 'cat_culture', view: 'cat_view', museum: 'cat_museum', walk: 'cat_walk', daytrip: 'cat_daytrip' };

  /* ===================== DATE HELPERS ===================== */
  function addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  }
  const URDU_WEEKDAYS = ['اتوار', 'پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ']; // Date.getDay(): 0=Sun
  function formatDate(date, opts) {
    opts = opts || {};
    const withWeekday = opts.weekday !== false;
    const withYear = opts.year !== false;
    if (LANG === 'ur') {
      const parts = [];
      if (withWeekday) parts.push(URDU_WEEKDAYS[date.getDay()] + ',');
      parts.push(date.getDate());
      parts.push(tArr('month_names')[date.getMonth()]);
      if (withYear) parts.push(date.getFullYear());
      return parts.join(' ');
    }
    const o = { day: 'numeric', month: 'short' };
    if (withWeekday) o.weekday = 'short';
    if (withYear) o.year = 'numeric';
    return date.toLocaleDateString('en-GB', o);
  }
  function fmt(date) {
    return formatDate(date, { weekday: true, year: true });
  }
  function fmtShort(date) {
    return formatDate(date, { weekday: false, year: false });
  }
  function sameDay(a, b) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }
  function stripTime(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  /* ===================== SCHEDULE COMPUTATION ===================== */
  function computeSchedule() {
    const legs = [];
    let cursor = new Date(TRIP_START);

    const sisterFirstEnd = addDays(cursor, state.sisterFirst * 7);
    legs.push({
      key: 'sisterFirst', name: t('leg_sisterFirst_name'), color: COLORS.sisterFirst,
      start: cursor, end: sisterFirstEnd,
      detail: t('leg_sisterFirst_detail', { date: fmt(TRIP_START) })
    });
    cursor = sisterFirstEnd;

    const withYouEnd = addDays(cursor, state.withYou * 7);
    legs.push({
      key: 'withYou', name: t('leg_withYou_name'), color: COLORS.withYou,
      start: cursor, end: withYouEnd,
      detail: t('leg_withYou_detail')
    });
    cursor = withYouEnd;

    const AbdullahEnd = addDays(cursor, Abdullah_WEEKS * 7);
    legs.push({
      key: 'Abdullah', name: t('leg_Abdullah_name'), color: COLORS.Abdullah,
      start: cursor, end: AbdullahEnd,
      detail: t('leg_Abdullah_detail')
    });
    cursor = AbdullahEnd;

    const sisterFinalEnd = addDays(cursor, state.sisterFinal * 7);
    legs.push({
      key: 'sisterFinal', name: t('leg_sisterFinal_name'), color: COLORS.sisterFinal,
      start: cursor, end: sisterFinalEnd,
      detail: t('leg_sisterFinal_detail', { date: fmt(TRIP_END) })
    });

    return { legs, calculatedEnd: sisterFinalEnd };
  }

  /* ===================== COUNTDOWN ===================== */
  function renderCountdown() {
    const now = new Date();
    const target = now < TRIP_START ? TRIP_START : TRIP_END;
    const diff = target - now;
    const els = {
      days: document.getElementById('cd-days'),
      hours: document.getElementById('cd-hours'),
      mins: document.getElementById('cd-mins'),
      secs: document.getElementById('cd-secs')
    };
    if (diff <= 0) {
      els.days.textContent = '0'; els.hours.textContent = '0'; els.mins.textContent = '0'; els.secs.textContent = '0';
      return;
    }
    const totalSecs = Math.floor(diff / 1000);
    els.days.textContent = Math.floor(totalSecs / 86400);
    els.hours.textContent = Math.floor((totalSecs % 86400) / 3600);
    els.mins.textContent = Math.floor((totalSecs % 3600) / 60);
    els.secs.textContent = totalSecs % 60;
  }

  function renderRouteStrip() {
    const stops = tArr('route_stops');
    const el = document.getElementById('routeStrip');
    el.innerHTML = stops.map((s, i) =>
      `<span class="stop">${s}</span>${i < stops.length - 1 ? '<span class="arrow">→</span>' : ''}`
    ).join('');
  }

  /* ===================== PLANNER ===================== */
  function weekLabel(n) {
    return n + ' ' + (n === 1 ? t('week_singular') : t('week_plural'));
  }

  function renderPlanner() {
    document.getElementById('val-sisterFirst').textContent = weekLabel(state.sisterFirst);
    document.getElementById('val-withYou').textContent = weekLabel(state.withYou);
    document.getElementById('val-sisterFinal').textContent = weekLabel(state.sisterFinal);

    const { calculatedEnd } = computeSchedule();
    const totalWeeks = state.sisterFirst + state.withYou + Abdullah_WEEKS + state.sisterFinal;
    const totalDays = Math.round((calculatedEnd - TRIP_START) / 86400000);
    const statusEl = document.getElementById('plannerStatus');

    if (sameDay(calculatedEnd, TRIP_END)) {
      statusEl.className = 'planner-status ok';
      statusEl.textContent = t('planner_status_ok', { weeks: totalWeeks });
    } else {
      const diffDays = Math.round((calculatedEnd - TRIP_END) / 86400000);
      statusEl.className = 'planner-status warn';
      statusEl.textContent = diffDays > 0
        ? t('planner_status_over', { days: diffDays })
        : t('planner_status_under', { days: Math.abs(diffDays) });
    }

    document.getElementById('sum-total').textContent = totalWeeks;
    document.getElementById('sum-days').textContent = totalDays;
    document.getElementById('sum-sister').textContent = state.sisterFirst + state.sisterFinal;
    document.getElementById('sum-you').textContent = state.withYou;
    document.getElementById('sum-end').textContent = fmtShort(calculatedEnd);
  }

  function initPlanner() {
    ['sisterFirst', 'withYou', 'sisterFinal'].forEach(key => {
      const input = document.getElementById(key);
      input.value = state[key];
      input.addEventListener('input', () => {
        state[key] = parseInt(input.value, 10);
        renderAll();
      });
    });
  }

  /* ===================== TIMELINE ===================== */
  function renderTimeline() {
    const { legs } = computeSchedule();
    const container = document.getElementById('timelineContainer');
    container.innerHTML = legs.map((leg, i) => `
      <div class="tl-item">
        <div class="tl-dot" style="border-color:${leg.color}"></div>
        <div class="tl-card" data-idx="${i}" style="border-left-color:${leg.color}; border-right-color:${leg.color}">
          <span class="chevron">▾</span>
          <h4>${leg.name}</h4>
          <div class="tl-dates">${fmt(leg.start)} → ${fmt(leg.end)}</div>
          <div class="tl-detail">${leg.detail}</div>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.tl-card').forEach(card => {
      card.addEventListener('click', () => card.classList.toggle('open'));
    });
  }

  /* ===================== CALENDAR ===================== */
  function legForDate(legs, date) {
    const d0 = stripTime(date);
    const found = legs.find(leg => d0 >= stripTime(leg.start) && d0 < stripTime(leg.end));
    if (found) return found;
    const lastLeg = legs[legs.length - 1];
    return sameDay(d0, stripTime(lastLeg.end)) ? lastLeg : null;
  }

  function renderCalendarLegend() {
    const { legs } = computeSchedule();
    const seen = new Set();
    const el = document.getElementById('calLegend');
    el.innerHTML = legs.filter(l => {
      if (seen.has(l.key)) return false;
      seen.add(l.key); return true;
    }).map(l => `<span><i style="background:${l.color}"></i>${l.name}</span>`).join('');
  }

  function buildMonth(year, month, legs) {
    const monthNames = tArr('month_names');
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startOffset = (firstDay.getDay() + 6) % 7; // Monday-first
    const today = new Date();

    let cells = '';
    for (let i = 0; i < startOffset; i++) cells += `<div class="cal-day empty"></div>`;
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d, 12, 0);
      const leg = legForDate(legs, date);
      const bg = leg ? leg.color + '2A' : 'transparent';
      const border = leg ? `border:1px solid ${leg.color}` : '';
      const isToday = sameDay(date, today);
      cells += `<div class="cal-day${isToday ? ' today' : ''}" style="background:${bg};${border}" title="${leg ? leg.name : ''}">${d}</div>`;
    }

    const monthAccent = ['#1E88E5', '#7C4DFF', '#FFC93C'][month % 3];
    return `
      <div class="cal-month" style="border-top-color:${monthAccent}">
        <h4>${monthNames[month]} ${year}</h4>
        <div class="cal-grid">
          ${tArr('dow_short').map(d => `<div class="dow">${d}</div>`).join('')}
          ${cells}
        </div>
      </div>
    `;
  }

  function renderCalendar() {
    const { legs } = computeSchedule();
    renderCalendarLegend();
    const container = document.getElementById('calMonths');
    container.innerHTML =
      buildMonth(2026, 7, legs) +  // August
      buildMonth(2026, 8, legs) +  // September
      buildMonth(2026, 9, legs);   // October
  }

  /* ===================== PARIS GUIDE ===================== */
  let activeFilter = 'all';

  function renderFilterBar() {
    const bar = document.getElementById('filterBar');
    bar.innerHTML = CATEGORY_ORDER.map(key =>
      `<button data-cat="${key}" class="${key === activeFilter ? 'active' : ''}">${t(CATEGORY_KEYS[key])}</button>`
    ).join('');
    bar.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        activeFilter = btn.dataset.cat;
        renderFilterBar();
        renderPlaceGrid();
      });
    });
  }

  function placeMediaHTML(place) {
    const custom = getCustomImageSrc(place.id);
    const tr = placeText(place);
    return `<img src="${custom || place.img}" alt="${tr.name}" loading="lazy"
      onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
      <span class="emoji-fallback" style="display:none">${place.emoji}</span>
      <span class="place-badge">${place.visited ? t('badge_revisit') : t('badge_new')}</span>
      <button type="button" class="media-edit-btn" data-editid="${place.id}">${custom ? t('edit_photo_btn') : t('add_photo_btn')}</button>`;
  }

  function bindMediaEditButtons(scope) {
    scope.querySelectorAll('.media-edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openImageEditModal(btn.dataset.editid);
      });
    });
  }

  function renderPlaceGrid() {
    const grid = document.getElementById('placeGrid');
    const newPlaces = PLACES.filter(p => !p.visited);
    const list = activeFilter === 'all' ? newPlaces : newPlaces.filter(p => p.category === activeFilter);
    grid.innerHTML = list.map(p => {
      const tr = placeText(p);
      return `
      <div class="place-card">
        <div class="place-media">${placeMediaHTML(p)}</div>
        <div class="place-body">
          <div class="meta">${t(CATEGORY_KEYS[p.category])}</div>
          <h4>${tr.name}</h4>
          <p>${tr.desc}</p>
          <div class="stats"><span>⏱ ${tr.duration}</span><span>☀ ${tr.best}</span></div>
        </div>
      </div>
    `;
    }).join('') || `<p>${t('no_places_msg')}</p>`;
    bindMediaEditButtons(grid);
  }

  /* ===================== DAY-BY-DAY ITINERARY ===================== */
  function renderItinerary() {
    const { legs } = computeSchedule();
    const withYouLeg = legs.find(l => l.key === 'withYou');
    const totalDays = Math.round((withYouLeg.end - withYouLeg.start) / 86400000);
    const restDays = Math.min(7, totalDays);
    const newPlaces = PLACES.filter(p => !p.visited);

    const container = document.getElementById('itineraryContainer');
    let html = '';
    let placeIdx = 0;
    let dayNum = 1;
    let cursor = new Date(withYouLeg.start);

    for (let i = 0; i < restDays; i++) {
      html += itinDayHTML(dayNum, cursor, 'rest', i === 0 ? t('day_arrival') : t('day_rest_recover'));
      cursor = addDays(cursor, 1); dayNum++;
    }

    let remaining = totalDays - restDays;
    let outingToggle = true;
    while (remaining > 0) {
      if (outingToggle && placeIdx < newPlaces.length) {
        const place = newPlaces[placeIdx++];
        const tr = placeText(place);
        html += itinDayHTML(dayNum, cursor, 'outing', t('outing_template', { emoji: place.emoji, name: tr.name, desc: tr.desc, best: tr.best, duration: tr.duration }));
      } else if (placeIdx >= newPlaces.length) {
        html += itinDayHTML(dayNum, cursor, 'rest', t('day_free'));
      } else {
        html += itinDayHTML(dayNum, cursor, 'rest', t('day_rest_between'));
      }
      outingToggle = !outingToggle;
      cursor = addDays(cursor, 1); dayNum++; remaining--;
    }

    container.innerHTML = html || `<p>${t('increase_duration_msg')}</p>`;
    container.querySelectorAll('.itin-day').forEach((d, idx) => { if (idx === restDays) d.open = true; });
  }

  function itinDayHTML(dayNum, date, type, text) {
    return `
      <details class="itin-day">
        <summary>${t('day_label', { n: dayNum })} · ${formatDate(date, { weekday: true, year: false })}
          <span class="tag ${type}">${type === 'outing' ? t('tag_outing') : t('tag_rest')}</span>
        </summary>
        <div class="itin-body">${text}</div>
      </details>
    `;
  }

  /* ===================== GALLERY ===================== */
  let activeGalleryTab = 'new';

  function renderGallery() {
    const grid = document.getElementById('galleryGrid');
    const list = PLACES.filter(p => activeGalleryTab === 'new' ? !p.visited : p.visited);
    grid.innerHTML = list.map(p => {
      const custom = getCustomImageSrc(p.id);
      const tr = placeText(p);
      return `
      <div class="gallery-item" data-id="${p.id}">
        <img src="${custom || p.img}" alt="${tr.name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <span class="emoji-fallback" style="display:none">${p.emoji}</span>
        <button type="button" class="media-edit-btn" data-editid="${p.id}">${custom ? t('edit_btn_short') : t('add_photo_btn')}</button>
        <div class="cap">${tr.name}</div>
      </div>
    `;
    }).join('');

    grid.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => openLightbox(item.dataset.id));
    });
    bindMediaEditButtons(grid);
  }

  function initGalleryTabs() {
    document.querySelectorAll('.gallery-tabs button').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.gallery-tabs button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeGalleryTab = btn.dataset.tab;
        renderGallery();
      });
    });
  }

  function openLightbox(id) {
    const place = PLACES.find(p => p.id === id);
    if (!place) return;
    const tr = placeText(place);
    document.getElementById('lightboxTitle').textContent = tr.name;
    document.getElementById('lightboxDesc').textContent = tr.desc;
    const media = document.getElementById('lightboxMedia');
    const custom = getCustomImageSrc(place.id);
    media.innerHTML = `<img src="${custom || place.img}" alt="${tr.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
      <span class="emoji-fallback" style="display:none">${place.emoji}</span>`;
    document.getElementById('lightbox').classList.add('open');
  }

  function initLightbox() {
    document.getElementById('lightboxClose').addEventListener('click', () => {
      document.getElementById('lightbox').classList.remove('open');
    });
    document.getElementById('lightbox').addEventListener('click', (e) => {
      if (e.target.id === 'lightbox') e.target.classList.remove('open');
    });
  }

  /* ===================== APPROVAL ===================== */
  const APPROVAL_KEY = 'europeTripApproval';
  const PEOPLE = [
    { id: 'you', key: 'person_you' },
    { id: 'busrah', key: 'person_busrah' },
    { id: 'Abdullah', key: 'person_Abdullah' }
  ];

  function loadApproval() {
    try { return JSON.parse(localStorage.getItem(APPROVAL_KEY)) || {}; } catch (e) { return {}; }
  }
  function saveApproval(data) {
    localStorage.setItem(APPROVAL_KEY, JSON.stringify(data));
  }

  function renderApproval() {
    const data = loadApproval();
    const grid = document.getElementById('approvalGrid');
    grid.innerHTML = PEOPLE.map(person => {
      const rec = data[person.id] || { stars: 0, approved: false };
      return `
        <div class="approval-card" data-person="${person.id}">
          <h4>${t(person.key)}</h4>
          <div class="stars" data-stars="${rec.stars}">
            ${[1,2,3,4,5].map(n => `<span data-n="${n}" class="${n <= rec.stars ? 'filled' : ''}">★</span>`).join('')}
          </div>
          <button class="${rec.approved ? 'approved' : ''}">${rec.approved ? t('approved_btn') : t('approve_btn')}</button>
          <div class="approval-note">${t('saved_device_note')}</div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.approval-card').forEach(card => {
      const personId = card.dataset.person;
      card.querySelectorAll('.stars span').forEach(star => {
        star.addEventListener('click', () => {
          const data = loadApproval();
          data[personId] = data[personId] || { stars: 0, approved: false };
          data[personId].stars = parseInt(star.dataset.n, 10);
          saveApproval(data);
          renderApproval();
        });
      });
      card.querySelector('button').addEventListener('click', () => {
        const data = loadApproval();
        data[personId] = data[personId] || { stars: 0, approved: false };
        data[personId].approved = !data[personId].approved;
        saveApproval(data);
        renderApproval();
      });
    });

    const approvedCount = PEOPLE.filter(p => (data[p.id] || {}).approved).length;
    document.getElementById('overallApproval').textContent =
      approvedCount === PEOPLE.length ? t('overall_all_approved') : t('overall_partial', { count: approvedCount, total: PEOPLE.length });
  }

  /* ===================== CUSTOM IMAGES (per-card, one image each) ===================== */
  const CUSTOM_IMAGES_KEY = 'europeTripCustomImages';

  function loadCustomImages() {
    try { return JSON.parse(localStorage.getItem(CUSTOM_IMAGES_KEY)) || {}; } catch (e) { return {}; }
  }
  function saveCustomImages(data) {
    localStorage.setItem(CUSTOM_IMAGES_KEY, JSON.stringify(data));
  }
  function getCustomImageSrc(id) {
    return loadCustomImages()[id] || null;
  }

  /* ===================== IMAGE COMPRESSION HELPER ===================== */
  function compressImage(file, maxDim, quality) {
    maxDim = maxDim || 1000;
    quality = quality || 0.72;
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let { width, height } = img;
          if (width > maxDim || height > maxDim) {
            if (width > height) { height = Math.round(height * maxDim / width); width = maxDim; }
            else { width = Math.round(width * maxDim / height); height = maxDim; }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width; canvas.height = height;
          canvas.getContext('2d').drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /* ===================== IMAGE EDIT MODAL (used by Paris Guide + Gallery cards) ===================== */
  let currentEditPlaceId = null;
  let pendingFileSrc = null;

  function setModalMode(mode) {
    document.querySelectorAll('.modal-tabs button').forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
    document.getElementById('imageUrlInput').style.display = mode === 'url' ? 'block' : 'none';
    document.getElementById('imageFileDrop').style.display = mode === 'file' ? 'block' : 'none';
  }

  function openImageEditModal(placeId) {
    const place = PLACES.find(p => p.id === placeId);
    if (!place) return;
    const tr = placeText(place);
    currentEditPlaceId = placeId;
    pendingFileSrc = null;
    const custom = getCustomImageSrc(placeId);
    document.getElementById('imageEditTitle').textContent = t('modal_title_for', { name: tr.name });
    document.getElementById('imageUrlInput').value = (custom && !custom.startsWith('data:')) ? custom : '';
    document.getElementById('imageFileInput').value = '';
    document.getElementById('imageEditPreview').innerHTML = custom
      ? `<img src="${custom}" alt="">`
      : `<span class="none">${t('modal_no_image', { emoji: place.emoji })}</span>`;
    setModalMode('url');
    document.getElementById('imageEditModal').classList.add('open');
  }

  function closeImageEditModal() {
    document.getElementById('imageEditModal').classList.remove('open');
  }

  function initImageEditModal() {
    document.querySelectorAll('.modal-tabs button').forEach(btn => {
      btn.addEventListener('click', () => setModalMode(btn.dataset.mode));
    });
    document.getElementById('imageFileInput').addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      pendingFileSrc = await compressImage(file);
      document.getElementById('imageEditPreview').innerHTML = `<img src="${pendingFileSrc}" alt="">`;
    });
    document.getElementById('imageSaveBtn').addEventListener('click', () => {
      const mode = document.querySelector('.modal-tabs button.active').dataset.mode;
      const src = mode === 'file' ? pendingFileSrc : document.getElementById('imageUrlInput').value.trim();
      if (!src) { alert(t('modal_no_image_alert')); return; }
      const data = loadCustomImages();
      data[currentEditPlaceId] = src;
      saveCustomImages(data);
      closeImageEditModal();
      renderPlaceGrid();
      renderGallery();
    });
    document.getElementById('imageRemoveBtn').addEventListener('click', () => {
      const data = loadCustomImages();
      delete data[currentEditPlaceId];
      saveCustomImages(data);
      closeImageEditModal();
      renderPlaceGrid();
      renderGallery();
    });
    document.getElementById('imageEditClose').addEventListener('click', closeImageEditModal);
    document.getElementById('imageEditModal').addEventListener('click', (e) => {
      if (e.target.id === 'imageEditModal') closeImageEditModal();
    });
  }

  /* ===================== STATIC SOUVENIRS (from images/souvenirs, shared for everyone) ===================== */
  const STATIC_SOUVENIR_COUNT = 12;

  function checkImageExists(src) {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
    });
  }

  async function renderStaticSouvenirs() {
    const grid = document.getElementById('staticSouvenirGrid');
    const slots = Array.from({ length: STATIC_SOUVENIR_COUNT }, (_, idx) => idx + 1);
    const results = await Promise.all(slots.map(n => {
      const src = `images/souvenirs/souvenir${n}.jpg`;
      return checkImageExists(src).then(ok => ({ ok, src, n }));
    }));
    const present = results.filter(r => r.ok);

    if (!present.length) {
      grid.innerHTML = `<p class="souvenir-empty">${t('souvenirs_static_empty')}</p>`;
      return;
    }

    grid.innerHTML = present.map(r => `
      <div class="gallery-item" data-src="${r.src}">
        <img src="${r.src}" alt="Souvenir ${r.n}">
      </div>
    `).join('');

    grid.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => openImageLightbox(item.dataset.src));
    });
  }

  function openImageLightbox(src) {
    document.getElementById('lightboxTitle').textContent = '';
    document.getElementById('lightboxDesc').textContent = '';
    document.getElementById('lightboxMedia').innerHTML = `<img src="${src}" alt="">`;
    document.getElementById('lightbox').classList.add('open');
  }

  /* ===================== SOUVENIRS (personal, this device only) ===================== */
  const SOUVENIR_KEY = 'europeTripSouvenirs';

  function loadSouvenirs() {
    try { return JSON.parse(localStorage.getItem(SOUVENIR_KEY)) || []; } catch (e) { return []; }
  }
  function saveSouvenirs(list) {
    localStorage.setItem(SOUVENIR_KEY, JSON.stringify(list));
  }
  function uid(prefix) {
    return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function renderSouvenirs() {
    const list = loadSouvenirs();
    const grid = document.getElementById('souvenirGrid');
    if (!list.length) {
      grid.innerHTML = `<p class="souvenir-empty">${t('souvenir_empty')}</p>`;
      return;
    }

    grid.innerHTML = list.map(cat => `
      <div class="souvenir-category">
        <div class="souvenir-cat-header">
          <h4>${cat.name}</h4>
          <button type="button" class="icon-btn cat-delete" data-cat="${cat.id}" title="${t('delete_category_title')}">🗑</button>
        </div>
        <div class="souvenir-photos">
          ${cat.photos.map(p => `
            <div class="souvenir-photo">
              <img src="${p.src}" alt="${p.caption || cat.name}">
              <button type="button" class="photo-delete" data-cat="${cat.id}" data-photo="${p.id}" title="${t('delete_photo_title')}">&times;</button>
              ${p.caption ? `<div class="cap">${p.caption}</div>` : ''}
            </div>
          `).join('')}
          <label class="souvenir-add-tile">
            <span>${t('souvenir_add_photo')}</span>
            <input type="file" accept="image/*" hidden class="souvenir-file-input" data-cat="${cat.id}">
          </label>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('.cat-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!confirm(t('confirm_delete_category'))) return;
        saveSouvenirs(loadSouvenirs().filter(c => c.id !== btn.dataset.cat));
        renderSouvenirs();
      });
    });
    grid.querySelectorAll('.photo-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const data = loadSouvenirs();
        const cat = data.find(c => c.id === btn.dataset.cat);
        if (cat) cat.photos = cat.photos.filter(p => p.id !== btn.dataset.photo);
        saveSouvenirs(data);
        renderSouvenirs();
      });
    });
    grid.querySelectorAll('.souvenir-file-input').forEach(input => {
      input.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const src = await compressImage(file);
        const caption = (prompt(t('caption_prompt'), '') || '').trim();
        const data = loadSouvenirs();
        const cat = data.find(c => c.id === input.dataset.cat);
        if (cat) cat.photos.push({ id: uid('p'), src, caption });
        saveSouvenirs(data);
        renderSouvenirs();
      });
    });
  }

  function initSouvenirs() {
    document.getElementById('addCategoryBtn').addEventListener('click', () => {
      const name = (prompt(t('category_prompt')) || '').trim();
      if (!name) return;
      const data = loadSouvenirs();
      data.push({ id: uid('c'), name, photos: [] });
      saveSouvenirs(data);
      renderSouvenirs();
    });
  }

  /* ===================== BACKUP EXPORT / IMPORT ===================== */
  function exportBackup() {
    const payload = {
      approval: loadApproval(),
      customImages: loadCustomImages(),
      souvenirs: loadSouvenirs(),
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'abu-europe-trip-backup.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function initBackup() {
    document.getElementById('exportBackupBtn').addEventListener('click', exportBackup);
    document.getElementById('importBackupInput').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const payload = JSON.parse(reader.result);
          if (payload.approval) saveApproval(payload.approval);
          if (payload.customImages) saveCustomImages(payload.customImages);
          if (payload.souvenirs) saveSouvenirs(payload.souvenirs);
          renderApproval();
          renderPlaceGrid();
          renderGallery();
          renderSouvenirs();
          alert(t('backup_restored_alert'));
        } catch (err) {
          alert(t('backup_invalid_alert'));
        }
        e.target.value = '';
      };
      reader.readAsText(file);
    });
  }

  /* ===================== FOOTER STATS ===================== */
  function renderFooter() {
    const { calculatedEnd } = computeSchedule();
    const totalDays = Math.round((calculatedEnd - TRIP_START) / 86400000);
    document.getElementById('footerStats').textContent = t('footer_stats', {
      days: totalDays,
      sisterWeeks: state.sisterFirst + state.sisterFinal,
      youWeeks: state.withYou,
      AbdullahWeeks: Abdullah_WEEKS
    });
  }

  /* ===================== NAV ===================== */
  function initNav() {
    document.getElementById('navToggle').addEventListener('click', () => {
      document.getElementById('navLinks').classList.toggle('open');
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
    });
  }

  /* ===================== RENDER ALL ===================== */
  function renderAll() {
    renderPlanner();
    renderTimeline();
    renderCalendar();
    renderItinerary();
    renderFooter();
  }

  function renderEverything() {
    renderRouteStrip();
    renderFilterBar();
    renderPlaceGrid();
    renderGallery();
    renderApproval();
    renderStaticSouvenirs();
    renderSouvenirs();
    renderAll();
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyStaticTranslations();
    initLangSwitch();
    renderRouteStrip();
    initNav();
    initPlanner();
    renderFilterBar();
    renderPlaceGrid();
    initGalleryTabs();
    renderGallery();
    initLightbox();
    initImageEditModal();
    renderApproval();
    renderStaticSouvenirs();
    initSouvenirs();
    renderSouvenirs();
    initBackup();
    renderAll();

    renderCountdown();
    setInterval(renderCountdown, 1000);
  });
})();
