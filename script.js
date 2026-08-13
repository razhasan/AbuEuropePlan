(() => {
  'use strict';

  /* ===================== CONFIG ===================== */
  const TRIP_START = new Date(2026, 7, 10, 18, 10);  // Aug 10 2026, 18:10 — landing at CGN
  const TRIP_END   = new Date(2026, 9, 19, 19, 0);   // Oct 19 2026, 19:00 — return flight
  const SITE_URL = 'https://razhasan.github.io/AbuEuropePlan/';

  const COLORS = {
    sisterFirst: '#1E88E5',
    withYou: '#FF5A5F',
    Abdullah: '#7C4DFF',
    sisterFinal: '#FFC93C'
  };

  const state = {
    sisterFirst: 21,
    withYou: 40,
    Abdullah: 7,
    sisterFinal: 2
  };

  /* ===================== LANGUAGE ===================== */
  let LANG = 'en'; // always starts in English by default

  /* ===================== DISPLAY UNIT (weeks/days) ===================== */
  let displayUnit = 'weeks';
  try {
    const savedUnit = localStorage.getItem('europeTripDisplayUnit');
    if (savedUnit === 'days' || savedUnit === 'weeks') displayUnit = savedUnit;
  } catch (e) { /* ignore */ }

  const STRINGS = {
    en: {
      page_title: "Abu's Europe Trip · Aug – Oct 2026",
      nav_brand: "🧳 Abu's Europe Journey",
      nav_planner: 'Planner', nav_timeline: 'Timeline', nav_calendar: 'Calendar', nav_map: 'Map', nav_guide: 'Paris Guide',
      nav_dayplan: 'Day Plan', nav_packing: 'Packing', nav_gallery: 'Gallery', nav_souvenirs: 'Souvenirs', nav_approval: 'Approval',

      music_song_name: "Nadiya Chale Ya Dhaara",
      music_song_caption: "Abu's favourite song 💙",
      music_play: 'Play', music_pause: 'Pause',
      music_tap_hint: 'Tap play to start the music',
      music_mode_once: 'Once', music_mode_loop: 'Loop', music_mode_shuffle: 'Shuffle',
      streetview_link_title: 'Open in Google Street View',
      youtube_link_label: 'Watch on YouTube', youtube_link_title: 'Search short YouTube videos about this place',
      souvenir_download_title: 'Download', souvenir_download_btn: 'Download',
      souvenir_no_media_alert: 'No photos or videos in this category yet — add some first.',
      souvenir_select_media_alert: 'Tap the photos or videos you want to share first, then tap Send.',
      souvenir_hide_title: 'Remove from view (this device only)',
      confirm_hide_souvenir: "Remove this from view? It will disappear from this device, but the file stays in the GitHub repo — other visitors (and you, on another device) will still see it unless it's deleted from GitHub directly.",

      hero_title: "Abu's Europe Visit",
      hero_subtitle_html: 'Cologne Bonn → Bonn (Busrah) → Verneuil-en-Halatte, Paris (us) → Stuttgart (Abdullah) → Bonn (Busrah) → home.<br>10 August – 19 October 2026',
      cd_days: 'Days', cd_hours: 'Hours', cd_mins: 'Minutes', cd_secs: 'Seconds',
      route_stops: ['CGN Airport', 'Bonn (Busrah)', 'Paris (You)', 'Stuttgart (Abdullah)', 'Bonn (Busrah)', 'Flight Home'],
      user_guide_btn: '📄 User Guide (PDF)',
      share_whatsapp_btn: '💬 Share on WhatsApp',
      share_whatsapp_text: "Abu's Europe Trip planner — dates, Paris guide, photos and more:",
      current_location_now: '📍 Right now: {name}',
      current_location_before: '✈️ The trip starts in {days} day(s) — check back on {date}!',
      current_location_after: '🎉 The trip is complete — thanks for following along!',

      step1: 'Step 1', step2: 'Step 2', step3: 'Step 3', step4: 'Step 4', step5: 'Step 5', step6: 'Step 6', step7: 'Step 7', step8: 'Step 8',
      label_map: '🗺️ Map', label_packing: '🎒 Packing',

      planner_h2: 'Trip Duration Planner',
      planner_intro: "Landing (Aug 10, 18:10) and the return flight (Oct 19, 19:00) are fixed — that's exactly 10 weeks. Drag the sliders below to divide those 10 weeks between Busrah's first stay, your stay in Paris, Abdullah's stay in Stuttgart, and Busrah's final stay, in that order — every date on this page updates instantly.",
      planner_field_sisterFirst_label: 'Bonn — Arrival stay (Busrah)',
      planner_field_sisterFirst_hint: 'Right after landing, before heading to Paris',
      planner_field_withYou_label: 'Paris / Verneuil-en-Halatte (You)',
      planner_field_withYou_hint: 'Rest week + sightseeing',
      planner_field_Abdullah_label: 'Stuttgart — Abdullah',
      planner_field_Abdullah_hint: 'Flexible — adjust to fit the total',
      planner_field_sisterFinal_label: 'Bonn — Final stay (Busrah)',
      planner_field_sisterFinal_hint: 'Until the Oct 19 flight home',
      week_singular: 'week', week_plural: 'weeks',
      day_singular: 'day', day_plural: 'days',
      unit_toggle_weeks: 'Weeks', unit_toggle_days: 'Days',
      planner_sum_sister_days: 'Days w/ Busrah', planner_sum_you_days: 'Days w/ You',
      planner_status_ok: '✓ Lines up perfectly with the Oct 19 return flight ({weeks} total).',
      planner_status_over: '⚠ This combination runs {days} day(s) past the Oct 19 return flight. Reduce one of the durations above.',
      planner_status_under: '⚠ This combination finishes {days} day(s) before the Oct 19 return flight. Add more days above.',
      planner_sum_total: 'Total weeks', planner_sum_days: 'Total days', planner_sum_end: 'Calculated return',
      planner_share_btn: '📤 Share This Plan on WhatsApp',
      planner_share_header: "🧳✈️ *Abu's Europe Trip — Planned Schedule*",
      planner_share_landing: '🛬 Landing in Cologne/Bonn: {date}',
      planner_share_return: '🛫 Return flight home: {date}',
      planner_share_cta: "💬 What do you think — does this plan work for you? Let us know if you'd like to suggest any changes!",
      donut_center_label: 'days total',

      timeline_h2: 'Interactive Timeline',
      timeline_intro: 'Click any stop to expand the details. Dates recompute live from the planner above.',
      timeline_now_label: '📍 Now',
      leg_sisterFirst_name: 'Bonn — Arrival stay with Busrah',
      leg_sisterFirst_detail: 'Landing at Cologne Bonn Airport at 18:10 on {date}, picked up by Busrah. Rest and settle in before the trip to Paris.',
      leg_withYou_name: 'Paris / Verneuil-en-Halatte — with you',
      leg_withYou_detail: 'Travel by train from Bonn to Paris (car as backup option), picked up by you. First week is rest, then Paris sightseeing — see the Day-by-Day Plan section below.',
      leg_Abdullah_name: 'Stuttgart — with Abdullah',
      leg_Abdullah_detail: 'Travel by train from Paris to Stuttgart. One week staying with Abdullah.',
      leg_sisterFinal_name: 'Bonn — Final stay with Busrah',
      leg_sisterFinal_detail: 'Back to Bonn by train from Stuttgart. Final stretch before the return flight home on {date} at 19:00.',

      calendar_h2: 'Full Calendar View',
      calendar_intro: "August, September and October 2026 at a glance, color-coded by who he's staying with.",
      month_names: ['January','February','March','April','May','June','July','August','September','October','November','December'],
      dow_short: ['M','T','W','T','F','S','S'],

      map_h2: 'Trip Map',
      map_intro: 'All the trip stops and Paris sightseeing spots in one interactive map — tap a pin for details.',

      guide_h2: 'Paris Sightseeing Guide',
      guide_intro: "He's already seen the Eiffel Tower, La Défense, the Bateau Mouche cruise, the Champs-Élysées, the Arc de Triomphe and Trocadéro Gardens. Here are fresh places to make this visit even more memorable — filter by type below.",
      cat_all: 'All', cat_culture: 'Culture', cat_view: 'Views', cat_museum: 'Museums', cat_walk: 'Easy Walks', cat_daytrip: 'Day Trip',
      badge_new: 'New', badge_revisit: 'Revisit',
      add_photo_btn: '+ Add Photo', edit_photo_btn: '✎ Edit Photo', edit_btn_short: '✎ Edit',
      no_places_msg: 'No places in this category.',
      add_place_btn: '+ Add Place',
      add_place_title: 'Add a Place',
      add_place_name_label: 'Name',
      add_place_status_label: 'Status',
      add_place_status_new: 'New to Visit',
      add_place_status_visited: 'Already Visited',
      add_place_category_label: 'Category',
      add_place_desc_label: 'Description (optional)',
      add_place_duration_label: 'Duration (optional)',
      add_place_best_label: 'Best time (optional)',
      add_place_photo_label: 'Photo (optional)',
      add_place_save_btn: 'Save Place',
      add_place_cancel_btn: 'Cancel',
      add_place_name_required_alert: 'Please enter a name for the place.',
      delete_place_title: 'Delete this place',
      confirm_delete_place: 'Delete this place card? This only affects this device.',

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

      packing_h2: 'Packing Checklist',
      packing_intro: "A simple checklist to help Abu pack — check items off as they're packed, or add your own. Saved on this device only.",
      packing_add_placeholder: 'Add an item…',
      packing_add_btn: '+ Add',
      packing_delete_title: 'Remove item',
      packing_item_passport: 'Passport / ID card',
      packing_item_medications: 'Medications',
      packing_item_charger: 'Phone charger & EU adapter',
      packing_item_shoes: 'Comfortable walking shoes',
      packing_item_clothing: 'Weather-appropriate clothing',
      packing_item_camera: 'Camera',
      packing_item_sunglasses: 'Sunglasses / hat',
      packing_item_bottle: 'Reusable water bottle',
      packing_item_snacks: 'Travel snacks',
      packing_item_umbrella: 'Umbrella / light raincoat',

      gallery_h2: 'Photo Gallery',
      gallery_intro_html: "Drop real photos into the <code>/images</code> folder using the filenames below and they'll appear automatically — until then, placeholder icons are shown.",
      tab_new: 'New Places to Visit', tab_visited: 'Already Visited',

      souvenirs_h2: 'Souvenirs',
      souvenirs_static_h3: 'Permanent Souvenir Photos',
      souvenirs_static_intro_html: 'Added directly to the <code>images/souvenirs</code> folder in the GitHub repo — visible to everyone who visits the site.',
      souvenirs_static_empty: 'No permanent souvenir photos in this category yet — add files named e.g. bonn1.jpg, bonn2.jpg to images/souvenirs on GitHub to see them here.',
      souvenirs_loading: 'Loading…',
      souvenirs_static_share_btn: '📤 Share on WhatsApp',
      souvenir_cat_bonn: '🏠 Bonn (Busrah)', souvenir_cat_paris: '🗼 Paris (You)', souvenir_cat_stuttgart: '🏡 Stuttgart (Abdullah)',
      souvenirs_personal_h3: 'Your Own Additions (this device only)',
      souvenirs_intro: 'A place to keep a photo record of souvenirs picked up along the way — one category per place or theme (e.g. "Eiffel Tower", "Garden"), with as many photos as you like inside each. Saved right on this device, like a WhatsApp media folder.',
      add_category_btn: '+ Add Category', export_backup_btn: '⬇ Export Backup', import_backup_btn: '⬆ Import Backup',
      souvenir_empty: 'No categories yet — click "+ Add Category" above to start keeping a photo record (e.g. "Eiffel Tower", "Garden").',
      souvenir_add_photo: '+ Add Photo',
      souvenir_share_btn: 'Share this category on WhatsApp',
      share_no_photos_alert: 'No photos in this category yet — add some first.',
      share_fallback_alert: "Your browser can't attach photos directly here. We'll open WhatsApp with a message instead — you can attach the photos there manually.",
      share_send_btn: '✅ Send ({count})',
      share_cancel_btn: '✕ Cancel',
      share_select_photos_alert: 'Tap the photos you want to share first, then tap Send.',
      share_tap_hint: 'Tap the photos you want to share, then tap Send.',
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

      footer_stats: '{days} days across 3 cities (Bonn, Paris/Verneuil-en-Halatte, Stuttgart) · {sisterWeeks} with Busrah · {youWeeks} with you · {AbdullahWeeks} with Abdullah.',
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
      nav_planner: 'منصوبہ ساز', nav_timeline: 'ٹائم لائن', nav_calendar: 'کیلنڈر', nav_map: 'نقشہ', nav_guide: 'پیرس گائیڈ',
      nav_dayplan: 'روزانہ منصوبہ', nav_packing: 'سامان کی فہرست', nav_gallery: 'گیلری', nav_souvenirs: 'یادگاریں', nav_approval: 'منظوری',

      music_song_name: 'ندیا چلے یا دھارا',
      music_song_caption: 'ابو کا پسندیدہ گانا 💙',
      music_play: 'چلائیں', music_pause: 'روکیں',
      music_tap_hint: 'گانا شروع کرنے کے لیے پلے دبائیں',
      music_mode_once: 'ایک بار', music_mode_loop: 'دہرائیں', music_mode_shuffle: 'اختلاط',
      streetview_link_title: 'گوگل اسٹریٹ ویو میں کھولیں',
      youtube_link_label: 'یوٹیوب پر دیکھیں', youtube_link_title: 'اس جگہ کے بارے میں مختصر یوٹیوب ویڈیوز تلاش کریں',
      souvenir_download_title: 'ڈاؤن لوڈ کریں', souvenir_download_btn: 'ڈاؤن لوڈ کریں',
      souvenir_no_media_alert: 'اس زمرے میں ابھی تک کوئی تصویر یا ویڈیو نہیں — پہلے کچھ شامل کریں۔',
      souvenir_select_media_alert: 'پہلے وہ تصاویر یا ویڈیوز منتخب کریں جو آپ شیئر کرنا چاہتے ہیں، پھر بھیجیں پر ٹیپ کریں۔',
      souvenir_hide_title: 'منظر سے ہٹائیں (صرف اس ڈیوائس پر)',
      confirm_hide_souvenir: 'اسے منظر سے ہٹا دیں؟ یہ اس ڈیوائس سے غائب ہو جائے گی، لیکن فائل گٹ ہب ریپو میں موجود رہے گی — دوسرے وزیٹرز (اور آپ کسی اور ڈیوائس پر) اسے پھر بھی دیکھ سکیں گے جب تک اسے براہ راست گٹ ہب سے حذف نہ کیا جائے۔',

      hero_title: 'ابو کا یورپ کا سفر',
      hero_subtitle_html: 'کولون بون → بون (بشریٰ) → ورنوے آں ہالات، پیرس (ہمارے ہاں) → سٹٹگارٹ (عبداللہ) → بون (بشریٰ) → گھر واپسی۔<br>10 اگست – 19 اکتوبر 2026',
      cd_days: 'دن', cd_hours: 'گھنٹے', cd_mins: 'منٹ', cd_secs: 'سیکنڈ',
      route_stops: ['کولون بون ایئرپورٹ', 'بون (بشریٰ)', 'پیرس (آپ)', 'سٹٹگارٹ (عبداللہ)', 'بون (بشریٰ)', 'واپسی پرواز'],
      user_guide_btn: '📄 صارف رہنما (PDF)',
      share_whatsapp_btn: '💬 واٹس ایپ پر شیئر کریں',
      share_whatsapp_text: 'ابو کے یورپ کے سفر کا منصوبہ — تاریخیں، پیرس گائیڈ، تصاویر اور مزید:',
      current_location_now: '📍 اس وقت: {name}',
      current_location_before: '✈️ سفر شروع ہونے میں {days} دن باقی ہیں — {date} کو دوبارہ چیک کریں!',
      current_location_after: '🎉 سفر مکمل ہو چکا ہے — ساتھ رہنے کا شکریہ!',

      step1: 'قدم 1', step2: 'قدم 2', step3: 'قدم 3', step4: 'قدم 4', step5: 'قدم 5', step6: 'قدم 6', step7: 'قدم 7', step8: 'قدم 8',
      label_map: '🗺️ نقشہ', label_packing: '🎒 سامان کی فہرست',

      planner_h2: 'سفر کے دورانیے کا منصوبہ',
      planner_intro: 'پہنچنے کا وقت (10 اگست، 18:10) اور واپسی کی پرواز (19 اکتوبر، 19:00) طے شدہ ہیں — یعنی مکمل 10 ہفتے۔ نیچے دیے گئے سلائیڈرز کو حرکت دے کر یہ 10 ہفتے اسی ترتیب میں تقسیم کریں: بشریٰ کے پاس پہلا قیام، پیرس میں آپ کے پاس قیام، سٹٹگارٹ میں عبداللہ کے پاس قیام، اور بشریٰ کے پاس آخری قیام — اس صفحے کی ہر تاریخ فوراً اپ ڈیٹ ہو جائے گی۔',
      planner_field_sisterFirst_label: 'بون — آمد پر قیام (بشریٰ)',
      planner_field_sisterFirst_hint: 'پہنچنے کے فوراً بعد، پیرس جانے سے پہلے',
      planner_field_withYou_label: 'پیرس / ورنوے آں ہالات (آپ)',
      planner_field_withYou_hint: 'آرام کا ہفتہ + سیر و تفریح',
      planner_field_Abdullah_label: 'سٹٹگارٹ — عبداللہ',
      planner_field_Abdullah_hint: 'لچکدار — کل میزان کے مطابق ایڈجسٹ کریں',
      planner_field_sisterFinal_label: 'بون — آخری قیام (بشریٰ)',
      planner_field_sisterFinal_hint: '19 اکتوبر کی واپسی پرواز تک',
      week_singular: 'ہفتہ', week_plural: 'ہفتے',
      day_singular: 'دن', day_plural: 'دن',
      unit_toggle_weeks: 'ہفتے', unit_toggle_days: 'دن',
      planner_sum_sister_days: 'بشریٰ کے ساتھ دن', planner_sum_you_days: 'آپ کے ساتھ دن',
      planner_status_ok: '✓ یہ 19 اکتوبر کی واپسی پرواز سے بالکل درست میل کھاتا ہے (کل {weeks})۔',
      planner_status_over: '⚠ یہ ترتیب 19 اکتوبر کی واپسی پرواز سے {days} دن آگے نکل جاتی ہے۔ اوپر کسی دورانیے کو کم کریں۔',
      planner_status_under: '⚠ یہ ترتیب 19 اکتوبر کی واپسی پرواز سے {days} دن پہلے ختم ہو جاتی ہے۔ اوپر مزید دن شامل کریں۔',
      planner_sum_total: 'کل ہفتے', planner_sum_days: 'کل دن', planner_sum_end: 'حساب شدہ واپسی',
      planner_share_btn: '📤 یہ منصوبہ واٹس ایپ پر شیئر کریں',
      planner_share_header: '🧳✈️ *ابو کے یورپ کے سفر کا طے شدہ شیڈول*',
      planner_share_landing: '🛬 کولون بون میں آمد: {date}',
      planner_share_return: '🛫 گھر واپسی پرواز: {date}',
      planner_share_cta: '💬 آپ کا کیا خیال ہے — کیا یہ منصوبہ آپ کے لیے مناسب ہے؟ اگر کوئی تبدیلی تجویز کرنی ہو تو بتائیں!',
      donut_center_label: 'کل دن',

      timeline_h2: 'انٹرایکٹو ٹائم لائن',
      timeline_intro: 'تفصیلات دیکھنے کے لیے کسی بھی سٹاپ پر کلک کریں۔ تاریخیں اوپر دیے گئے منصوبہ ساز سے فوری اپ ڈیٹ ہوتی ہیں۔',
      timeline_now_label: '📍 ابھی',
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

      map_h2: 'سفر کا نقشہ',
      map_intro: 'سفر کے تمام پڑاؤ اور پیرس کی سیر کی جگہیں ایک انٹرایکٹو نقشے میں — تفصیلات کے لیے کسی بھی پن پر ٹیپ کریں۔',

      guide_h2: 'پیرس سیر کی گائیڈ',
      guide_intro: 'وہ پہلے ہی ایفل ٹاور، لا ڈیفانس، باتو موش کروز، شانزے لیزے، آرک دی تریومف اور تروکادیرو باغات دیکھ چکے ہیں۔ اس بار سفر کو مزید یادگار بنانے کے لیے کچھ نئی جگہیں یہ رہیں — نیچے قسم کے مطابق فلٹر کریں۔',
      cat_all: 'تمام', cat_culture: 'ثقافت', cat_view: 'نظارے', cat_museum: 'عجائب گھر', cat_walk: 'آسان سیر', cat_daytrip: 'دن کا سفر',
      badge_new: 'نیا', badge_revisit: 'دوبارہ ملاحظہ',
      add_photo_btn: '+ تصویر شامل کریں', edit_photo_btn: '✎ تصویر میں تبدیلی', edit_btn_short: '✎ ترمیم',
      no_places_msg: 'اس زمرے میں کوئی جگہ نہیں۔',
      add_place_btn: '+ جگہ شامل کریں',
      add_place_title: 'جگہ شامل کریں',
      add_place_name_label: 'نام',
      add_place_status_label: 'حیثیت',
      add_place_status_new: 'دیکھنے کے لیے نئی',
      add_place_status_visited: 'پہلے دیکھی گئی',
      add_place_category_label: 'قسم',
      add_place_desc_label: 'تفصیل (اختیاری)',
      add_place_duration_label: 'دورانیہ (اختیاری)',
      add_place_best_label: 'بہترین وقت (اختیاری)',
      add_place_photo_label: 'تصویر (اختیاری)',
      add_place_save_btn: 'جگہ محفوظ کریں',
      add_place_cancel_btn: 'منسوخ کریں',
      add_place_name_required_alert: 'براہ کرم جگہ کا نام درج کریں۔',
      delete_place_title: 'یہ جگہ حذف کریں',
      confirm_delete_place: 'کیا یہ جگہ کارڈ حذف کر دیا جائے؟ یہ صرف اسی ڈیوائس پر اثر انداز ہوگا۔',

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

      packing_h2: 'سامان کی فہرست',
      packing_intro: 'ابو کے سامان باندھنے میں مدد کے لیے ایک آسان فہرست — سامان باندھنے پر آئٹم کو نشان زد کریں، یا اپنا آئٹم شامل کریں۔ صرف اسی ڈیوائس پر محفوظ۔',
      packing_add_placeholder: 'آئٹم شامل کریں…',
      packing_add_btn: '+ شامل کریں',
      packing_delete_title: 'آئٹم ہٹائیں',
      packing_item_passport: 'پاسپورٹ / شناختی کارڈ',
      packing_item_medications: 'ادویات',
      packing_item_charger: 'فون چارجر اور یورپی اڈاپٹر',
      packing_item_shoes: 'چلنے کے آرام دہ جوتے',
      packing_item_clothing: 'موسم کے مطابق کپڑے',
      packing_item_camera: 'کیمرہ',
      packing_item_sunglasses: 'دھوپ کا چشمہ / ٹوپی',
      packing_item_bottle: 'دوبارہ استعمال ہونے والی پانی کی بوتل',
      packing_item_snacks: 'سفر کے لیے ناشتہ',
      packing_item_umbrella: 'چھتری / ہلکا بارشی کوٹ',

      gallery_h2: 'تصویری گیلری',
      gallery_intro_html: '<code>/images</code> فولڈر میں نیچے دیے گئے ناموں کے مطابق اصل تصاویر ڈالیں تو وہ خودکار طور پر نظر آئیں گی — اس وقت تک نمائندہ آئیکن دکھائے جا رہے ہیں۔',
      tab_new: 'دیکھنے کے لیے نئی جگہیں', tab_visited: 'پہلے دیکھی گئی جگہیں',

      souvenirs_h2: 'یادگاریں',
      souvenirs_static_h3: 'مستقل یادگار تصاویر',
      souvenirs_static_intro_html: '<code>images/souvenirs</code> فولڈر میں براہ راست شامل کی گئیں — سائٹ پر آنے والے ہر شخص کو نظر آتی ہیں۔',
      souvenirs_static_empty: 'اس زمرے میں ابھی تک کوئی مستقل یادگار تصویر نہیں — گٹ ہب پر images/souvenirs میں مثلاً bonn1.jpg، bonn2.jpg ناموں سے فائلیں شامل کریں تاکہ یہ یہاں نظر آئیں۔',
      souvenirs_loading: 'لوڈ ہو رہا ہے…',
      souvenirs_static_share_btn: '📤 واٹس ایپ پر شیئر کریں',
      souvenir_cat_bonn: '🏠 بون (بصرہ)', souvenir_cat_paris: '🗼 پیرس (آپ)', souvenir_cat_stuttgart: '🏡 اسٹٹگارٹ (عبداللہ)',
      souvenirs_personal_h3: 'آپ کی اپنی شامل کردہ تصاویر (صرف اس ڈیوائس پر)',
      souvenirs_intro: 'راستے میں لی گئی یادگاروں کی تصویری ریکارڈ رکھنے کی جگہ — ہر جگہ یا موضوع کے لیے ایک زمرہ (مثلاً "ایفل ٹاور"، "باغ")، جس میں آپ جتنی چاہیں تصاویر رکھ سکتے ہیں۔ بالکل اسی ڈیوائس پر محفوظ، واٹس ایپ میڈیا فولڈر کی طرح۔',
      add_category_btn: '+ زمرہ شامل کریں', export_backup_btn: '⬇ بیک اپ ایکسپورٹ کریں', import_backup_btn: '⬆ بیک اپ درآمد کریں',
      souvenir_empty: 'ابھی تک کوئی زمرہ نہیں — تصویری ریکارڈ شروع کرنے کے لیے اوپر "+ زمرہ شامل کریں" پر کلک کریں (مثلاً "ایفل ٹاور"، "باغ")۔',
      souvenir_add_photo: '+ تصویر شامل کریں',
      souvenir_share_btn: 'اس زمرے کو واٹس ایپ پر شیئر کریں',
      share_no_photos_alert: 'اس زمرے میں ابھی تک کوئی تصویر نہیں — پہلے کچھ شامل کریں۔',
      share_fallback_alert: 'آپ کا براؤزر یہاں براہ راست تصاویر منسلک نہیں کر سکتا۔ اس کے بجائے واٹس ایپ ایک پیغام کے ساتھ کھولا جا رہا ہے — آپ وہاں تصاویر خود منسلک کر سکتے ہیں۔',
      share_send_btn: '✅ بھیجیں ({count})',
      share_cancel_btn: '✕ منسوخ کریں',
      share_select_photos_alert: 'پہلے وہ تصاویر منتخب کریں جو آپ شیئر کرنا چاہتے ہیں، پھر بھیجیں پر ٹیپ کریں۔',
      share_tap_hint: 'جو تصاویر شیئر کرنی ہیں ان پر ٹیپ کریں، پھر بھیجیں پر ٹیپ کریں۔',
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

      footer_stats: '3 شہروں (بون، پیرس/ورنوے آں ہالات، سٹٹگارٹ) میں {days} دن · بشریٰ کے ساتھ {sisterWeeks} · آپ کے ساتھ {youWeeks} · عبداللہ کے ساتھ {AbdullahWeeks}۔',
      footer_tagline: 'ابو کے یورپ کے بڑے سفر کے لیے محبت سے تیار کیا گیا ✈️',

      modal_title_default: 'تصویر شامل کریں', modal_title_for: '{name} کی تصویر',
      modal_tab_url: 'لنک چسپاں کریں', modal_tab_file: 'ڈیوائس سے اپ لوڈ کریں',
      modal_file_drop_text: 'ڈیوائس سے تصویر منتخب کرنے کے لیے تھپتھپائیں',
      modal_remove_btn: 'تصویر ہٹائیں', modal_save_btn: 'محفوظ کریں',
      modal_no_image: 'کوئی تصویر مقرر نہیں — {emoji} نمائندہ نشان دکھایا جا رہا ہے۔',
      modal_no_image_alert: 'براہ کرم پہلے تصویر کا لنک چسپاں کریں یا ڈیوائس سے تصویر منتخب کریں۔'
    },
    fr: {
      page_title: "Voyage d'Abu en Europe · Août – Oct 2026",
      nav_brand: "🧳 Le Voyage d'Abu en Europe",
      nav_planner: 'Planificateur', nav_timeline: 'Chronologie', nav_calendar: 'Calendrier', nav_map: 'Carte', nav_guide: 'Guide de Paris',
      nav_dayplan: 'Programme du Jour', nav_packing: 'Bagages', nav_gallery: 'Galerie', nav_souvenirs: 'Souvenirs', nav_approval: 'Approbation',

      music_song_name: "Nadiya Chale Ya Dhaara",
      music_song_caption: "La chanson préférée d'Abu 💙",
      music_play: 'Lecture', music_pause: 'Pause',
      music_tap_hint: 'Appuyez sur lecture pour démarrer la musique',
      music_mode_once: 'Une fois', music_mode_loop: 'Boucle', music_mode_shuffle: 'Aléatoire',
      streetview_link_title: 'Ouvrir dans Google Street View',
      youtube_link_label: 'Voir sur YouTube', youtube_link_title: 'Rechercher de courtes vidéos YouTube sur ce lieu',
      souvenir_download_title: 'Télécharger', souvenir_download_btn: 'Télécharger',
      souvenir_no_media_alert: "Aucune photo ou vidéo dans cette catégorie pour l'instant — ajoutez-en d'abord.",
      souvenir_select_media_alert: "Touchez d'abord les photos ou vidéos à partager, puis touchez Envoyer.",
      souvenir_hide_title: 'Retirer de la vue (cet appareil uniquement)',
      confirm_hide_souvenir: "Retirer ceci de la vue ? Cela disparaîtra de cet appareil, mais le fichier reste dans le dépôt GitHub — les autres visiteurs (et vous, sur un autre appareil) le verront toujours, sauf s'il est supprimé directement sur GitHub.",

      hero_title: "Voyage d'Abu en Europe",
      hero_subtitle_html: 'Cologne Bonn → Bonn (Busrah) → Verneuil-en-Halatte, Paris (chez nous) → Stuttgart (Abdullah) → Bonn (Busrah) → retour à la maison.<br>10 août – 19 octobre 2026',
      cd_days: 'Jours', cd_hours: 'Heures', cd_mins: 'Minutes', cd_secs: 'Secondes',
      route_stops: ['Aéroport de Cologne', 'Bonn (Busrah)', 'Paris (Vous)', 'Stuttgart (Abdullah)', 'Bonn (Busrah)', 'Vol de retour'],
      user_guide_btn: "📄 Guide d'utilisation (PDF)",
      share_whatsapp_btn: '💬 Partager sur WhatsApp',
      share_whatsapp_text: "Planificateur du voyage d'Abu en Europe — dates, guide de Paris, photos et plus :",
      current_location_now: '📍 En ce moment : {name}',
      current_location_before: '✈️ Le voyage commence dans {days} jour(s) — revenez le {date} !',
      current_location_after: '🎉 Le voyage est terminé — merci de nous avoir suivis !',

      step1: 'Étape 1', step2: 'Étape 2', step3: 'Étape 3', step4: 'Étape 4', step5: 'Étape 5', step6: 'Étape 6', step7: 'Étape 7', step8: 'Étape 8',
      label_map: '🗺️ Carte', label_packing: '🎒 Bagages',

      planner_h2: 'Planificateur de Durée du Voyage',
      planner_intro: "L'atterrissage (10 août, 18h10) et le vol de retour (19 octobre, 19h00) sont fixes — soit exactement 10 semaines. Faites glisser les curseurs ci-dessous pour répartir ces 10 semaines, dans cet ordre : le premier séjour de Busrah, votre séjour à Paris, le séjour d'Abdullah à Stuttgart, puis le séjour final de Busrah — chaque date sur cette page se met à jour instantanément.",
      planner_field_sisterFirst_label: "Bonn — Séjour à l'arrivée (Busrah)",
      planner_field_sisterFirst_hint: "Juste après l'atterrissage, avant de partir pour Paris",
      planner_field_withYou_label: 'Paris / Verneuil-en-Halatte (Vous)',
      planner_field_withYou_hint: 'Semaine de repos + visites',
      planner_field_Abdullah_label: 'Stuttgart — Abdullah',
      planner_field_Abdullah_hint: 'Flexible — ajustez selon le total',
      planner_field_sisterFinal_label: 'Bonn — Séjour final (Busrah)',
      planner_field_sisterFinal_hint: "Jusqu'au vol de retour du 19 octobre",
      week_singular: 'semaine', week_plural: 'semaines',
      day_singular: 'jour', day_plural: 'jours',
      unit_toggle_weeks: 'Semaines', unit_toggle_days: 'Jours',
      planner_sum_sister_days: 'Jours avec Busrah', planner_sum_you_days: 'Jours avec vous',
      planner_status_ok: '✓ Correspond parfaitement au vol de retour du 19 octobre ({weeks} au total).',
      planner_status_over: "⚠ Cette combinaison dépasse le vol de retour du 19 octobre de {days} jour(s). Réduisez l'une des durées ci-dessus.",
      planner_status_under: '⚠ Cette combinaison se termine {days} jour(s) avant le vol de retour du 19 octobre. Ajoutez plus de jours ci-dessus.',
      planner_sum_total: 'Semaines totales', planner_sum_days: 'Jours totaux', planner_sum_end: 'Retour calculé',
      planner_share_btn: '📤 Partager ce Plan sur WhatsApp',
      planner_share_header: "🧳✈️ *Voyage d'Abu en Europe — Programme Prévu*",
      planner_share_landing: '🛬 Atterrissage à Cologne/Bonn : {date}',
      planner_share_return: '🛫 Vol de retour : {date}',
      planner_share_cta: "💬 Qu'en pensez-vous — ce plan vous convient-il ? Dites-nous si vous souhaitez proposer des changements !",
      donut_center_label: 'jours au total',

      timeline_h2: 'Chronologie Interactive',
      timeline_intro: 'Cliquez sur une étape pour voir les détails. Les dates se recalculent en direct depuis le planificateur ci-dessus.',
      timeline_now_label: '📍 Maintenant',
      leg_sisterFirst_name: "Bonn — Séjour à l'arrivée avec Busrah",
      leg_sisterFirst_detail: "Atterrissage à l'aéroport de Cologne-Bonn à 18h10 le {date}, accueil par Busrah. Repos avant le voyage vers Paris.",
      leg_withYou_name: 'Paris / Verneuil-en-Halatte — avec vous',
      leg_withYou_detail: "Voyage en train de Bonn à Paris (voiture en option), accueil par vous. Première semaine de repos, puis visites de Paris — voir la section Programme du Jour ci-dessous.",
      leg_Abdullah_name: 'Stuttgart — avec Abdullah',
      leg_Abdullah_detail: 'Voyage en train de Paris à Stuttgart. Une semaine de séjour avec Abdullah.',
      leg_sisterFinal_name: 'Bonn — Séjour final avec Busrah',
      leg_sisterFinal_detail: 'Retour à Bonn en train depuis Stuttgart. Dernière étape avant le vol de retour le {date} à 19h00.',

      calendar_h2: 'Vue du Calendrier Complet',
      calendar_intro: "Août, septembre et octobre 2026 en un coup d'œil, avec des couleurs selon la personne chez qui il séjourne.",
      month_names: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
      dow_short: ['L','M','M','J','V','S','D'],

      map_h2: 'Carte du Voyage',
      map_intro: "Tous les arrêts du voyage et les sites touristiques de Paris sur une carte interactive — appuyez sur un repère pour les détails.",

      guide_h2: 'Guide Touristique de Paris',
      guide_intro: "Il a déjà vu la Tour Eiffel, La Défense, la croisière en Bateau Mouche, les Champs-Élysées, l'Arc de Triomphe et les jardins du Trocadéro. Voici de nouveaux endroits pour rendre cette visite encore plus mémorable — filtrez par type ci-dessous.",
      cat_all: 'Tout', cat_culture: 'Culture', cat_view: 'Vues', cat_museum: 'Musées', cat_walk: 'Promenades Faciles', cat_daytrip: 'Excursion',
      badge_new: 'Nouveau', badge_revisit: 'À Revoir',
      add_photo_btn: '+ Ajouter une Photo', edit_photo_btn: '✎ Modifier la Photo', edit_btn_short: '✎ Modifier',
      no_places_msg: 'Aucun lieu dans cette catégorie.',
      add_place_btn: '+ Ajouter un Lieu',
      add_place_title: 'Ajouter un Lieu',
      add_place_name_label: 'Nom',
      add_place_status_label: 'Statut',
      add_place_status_new: 'À Visiter',
      add_place_status_visited: 'Déjà Visité',
      add_place_category_label: 'Catégorie',
      add_place_desc_label: 'Description (facultatif)',
      add_place_duration_label: 'Durée (facultatif)',
      add_place_best_label: 'Meilleur moment (facultatif)',
      add_place_photo_label: 'Photo (facultatif)',
      add_place_save_btn: 'Enregistrer le Lieu',
      add_place_cancel_btn: 'Annuler',
      add_place_name_required_alert: 'Veuillez entrer un nom pour ce lieu.',
      delete_place_title: 'Supprimer ce lieu',
      confirm_delete_place: "Supprimer cette carte de lieu ? Cela n'affecte que cet appareil.",

      dayplan_h2: 'Programme Jour par Jour Suggéré',
      dayplan_intro: "Généré automatiquement selon la durée de votre séjour à Paris : une semaine de repos pour s'installer, puis des jours de visites alternés avec des jours de repos pour que ce soit confortable et sans précipitation.",
      day_arrival: 'Arrivée chez vous — dîner de bienvenue, aucun programme, juste du temps en famille.',
      day_rest_recover: 'Jour de repos — récupérer du voyage, se promener dans le quartier, repas faits maison.',
      day_free: "Jour libre — revisite facultative d'un endroit préféré, shopping, ou simplement se détendre à la maison.",
      day_rest_between: 'Jour de repos entre les sorties — garder un rythme confortable.',
      outing_template: '{emoji} Visite de <strong>{name}</strong> — {desc} (Meilleur moment : {best}, ~{duration}).',
      tag_outing: 'Sortie', tag_rest: 'Repos',
      day_label: 'Jour {n}',
      increase_duration_msg: 'Augmentez la durée de "Paris / Verneuil-en-Halatte" dans le planificateur pour générer un programme.',

      packing_h2: 'Liste de Bagages',
      packing_intro: "Une liste simple pour aider Abu à faire ses bagages — cochez les articles au fur et à mesure, ou ajoutez les vôtres. Enregistré sur cet appareil uniquement.",
      packing_add_placeholder: 'Ajouter un article…',
      packing_add_btn: '+ Ajouter',
      packing_delete_title: "Retirer l'article",
      packing_item_passport: "Passeport / carte d'identité",
      packing_item_medications: 'Médicaments',
      packing_item_charger: 'Chargeur de téléphone et adaptateur européen',
      packing_item_shoes: 'Chaussures de marche confortables',
      packing_item_clothing: 'Vêtements adaptés à la météo',
      packing_item_camera: 'Appareil photo',
      packing_item_sunglasses: 'Lunettes de soleil / chapeau',
      packing_item_bottle: "Bouteille d'eau réutilisable",
      packing_item_snacks: 'Collations pour le voyage',
      packing_item_umbrella: 'Parapluie / imperméable léger',

      gallery_h2: 'Galerie Photo',
      gallery_intro_html: "Déposez de vraies photos dans le dossier <code>/images</code> en utilisant les noms de fichiers ci-dessous et elles apparaîtront automatiquement — en attendant, des icônes provisoires sont affichées.",
      tab_new: 'Nouveaux Lieux à Visiter', tab_visited: 'Déjà Visités',

      souvenirs_h2: 'Souvenirs',
      souvenirs_static_h3: 'Photos de Souvenirs Permanentes',
      souvenirs_static_intro_html: 'Ajoutées directement dans le dossier <code>images/souvenirs</code> du dépôt GitHub — visibles pour tous les visiteurs du site.',
      souvenirs_static_empty: "Aucune photo de souvenir permanente dans cette catégorie pour l'instant — ajoutez des fichiers nommés par ex. bonn1.jpg, bonn2.jpg dans images/souvenirs sur GitHub pour les voir ici.",
      souvenirs_loading: 'Chargement…',
      souvenirs_static_share_btn: '📤 Partager sur WhatsApp',
      souvenir_cat_bonn: '🏠 Bonn (Busrah)', souvenir_cat_paris: '🗼 Paris (Vous)', souvenir_cat_stuttgart: '🏡 Stuttgart (Abdullah)',
      souvenirs_personal_h3: 'Vos Propres Ajouts (cet appareil uniquement)',
      souvenirs_intro: 'Un endroit pour garder une trace photo des souvenirs récupérés en chemin — une catégorie par lieu ou thème (ex. "Tour Eiffel", "Jardin"), avec autant de photos que vous le souhaitez dans chacune. Enregistré directement sur cet appareil, comme un dossier média WhatsApp.',
      add_category_btn: '+ Ajouter une Catégorie', export_backup_btn: '⬇ Exporter la Sauvegarde', import_backup_btn: '⬆ Importer une Sauvegarde',
      souvenir_empty: 'Aucune catégorie pour l\'instant — cliquez sur "+ Ajouter une Catégorie" ci-dessus pour commencer une trace photo (ex. "Tour Eiffel", "Jardin").',
      souvenir_add_photo: '+ Ajouter une Photo',
      souvenir_share_btn: 'Partager cette catégorie sur WhatsApp',
      share_no_photos_alert: "Aucune photo dans cette catégorie pour l'instant — ajoutez-en d'abord.",
      share_fallback_alert: "Votre navigateur ne peut pas joindre les photos directement ici. WhatsApp va s'ouvrir avec un message à la place — vous pourrez y joindre les photos vous-même.",
      share_send_btn: '✅ Envoyer ({count})',
      share_cancel_btn: '✕ Annuler',
      share_select_photos_alert: "Touchez d'abord les photos à partager, puis touchez Envoyer.",
      share_tap_hint: 'Touchez les photos que vous voulez partager, puis touchez Envoyer.',
      category_prompt: 'Nom de la catégorie (ex. "Tour Eiffel", "Jardin") :',
      caption_prompt: 'Légende facultative pour cette photo (laissez vide pour ignorer) :',
      confirm_delete_category: 'Supprimer toute cette catégorie et ses photos ?',
      delete_category_title: 'Supprimer la catégorie', delete_photo_title: 'Supprimer la photo',
      backup_restored_alert: 'Sauvegarde restaurée avec succès.',
      backup_invalid_alert: "Impossible de lire ce fichier de sauvegarde — assurez-vous qu'il s'agit d'un export de cette page.",

      approval_h2: 'Approbation Familiale',
      approval_intro_html: "Notez le plan et donnez votre approbation. Enregistré sur cet appareil/navigateur. <em>Remarque : comme il s'agit d'une simple page hors ligne, les approbations ne se synchronisent pas automatiquement entre les téléphones — chaque personne approuve depuis l'appareil qu'elle utilise, ou vous pouvez partager une capture d'écran.</em>",
      person_you: 'Vous', person_busrah: 'Busrah', person_Abdullah: 'Abdullah',
      approve_btn: 'Approuver le Plan', approved_btn: '✓ Approuvé', saved_device_note: 'Enregistré sur cet appareil uniquement',
      overall_all_approved: '🎉 Tout le monde a approuvé le plan !',
      overall_partial: "{count} membres de la famille sur {total} ont approuvé jusqu'à présent.",

      footer_stats: '{days} jours à travers 3 villes (Bonn, Paris/Verneuil-en-Halatte, Stuttgart) · {sisterWeeks} avec Busrah · {youWeeks} avec vous · {AbdullahWeeks} avec Abdullah.',
      footer_tagline: "Réalisé avec amour pour la grande aventure européenne d'Abu ✈️",

      modal_title_default: 'Ajouter une Image', modal_title_for: 'Photo pour {name}',
      modal_tab_url: 'Coller un Lien', modal_tab_file: "Télécharger depuis l'Appareil",
      modal_file_drop_text: 'Appuyez pour choisir une photo depuis votre appareil',
      modal_remove_btn: "Supprimer l'Image", modal_save_btn: 'Enregistrer',
      modal_no_image: 'Aucune image définie — le symbole {emoji} est affiché.',
      modal_no_image_alert: "Veuillez coller un lien d'image ou choisir une photo depuis votre appareil d'abord."
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
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.setAttribute('placeholder', t(el.dataset.i18nPlaceholder));
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
    updateWhatsappShareLink();
  }

  function setLang(lang) {
    LANG = lang;
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ur' ? 'rtl' : 'ltr');
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
    document.getElementById('userGuideBtnEn').style.display = lang === 'en' ? 'inline-block' : 'none';
    document.getElementById('userGuideBtnUr').style.display = lang === 'ur' ? 'inline-block' : 'none';
    document.getElementById('userGuideBtnFr').style.display = lang === 'fr' ? 'inline-block' : 'none';
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
    { id: 'eiffel', visited: true, category: 'view', emoji: '🗼', img: 'images/eiffel-tower.jpg', lat: 48.8584, lng: 2.2945,
      i18n: {
        en: { name: 'Eiffel Tower', desc: 'Already visited — a great spot to revisit at night when it sparkles on the hour.', duration: '2-3 hrs', best: 'Evening' },
        ur: { name: 'ایفل ٹاور', desc: 'پہلے دیکھا جا چکا ہے — رات کو جب یہ ہر گھنٹے چمکتا ہے تو دوبارہ دیکھنے کی بہترین جگہ۔', duration: '2-3 گھنٹے', best: 'شام' },
        fr: { name: 'Tour Eiffel', desc: 'Déjà visitée — un excellent endroit à revoir la nuit quand elle scintille à chaque heure.', duration: '2-3 h', best: 'Soir' }
      } },
    { id: 'ladefense', visited: true, category: 'walk', emoji: '🏙️', img: 'images/la-defense.jpg', lat: 48.8918, lng: 2.236,
      i18n: {
        en: { name: 'La Défense', desc: "Already visited — Paris's modern skyline and the Grande Arche.", duration: '2 hrs', best: 'Afternoon' },
        ur: { name: 'لا ڈیفانس', desc: 'پہلے دیکھا جا چکا ہے — پیرس کی جدید عمارتیں اور گرینڈ آرش۔', duration: '2 گھنٹے', best: 'دوپہر' },
        fr: { name: 'La Défense', desc: 'Déjà visitée — les gratte-ciels modernes de Paris et la Grande Arche.', duration: '2 h', best: 'Après-midi' }
      } },
    { id: 'bateaumouche', visited: true, category: 'view', emoji: '🚤', img: 'images/bateau-mouche.jpg', lat: 48.8639, lng: 2.3011,
      i18n: {
        en: { name: 'Bateau Mouche (Seine Cruise)', desc: "Already visited — the classic river cruise past Paris's landmarks.", duration: '1 hr', best: 'Evening' },
        ur: { name: 'باتو موش (دریائے سین کروز)', desc: 'پہلے دیکھا جا چکا ہے — پیرس کے مشہور مقامات کے پاس سے کلاسیکی دریائی کروز۔', duration: '1 گھنٹہ', best: 'شام' },
        fr: { name: 'Bateau Mouche (Croisière sur la Seine)', desc: 'Déjà visité — la croisière classique sur la Seine devant les monuments de Paris.', duration: '1 h', best: 'Soir' }
      } },
    { id: 'champs', visited: true, category: 'walk', emoji: '🛍️', img: 'images/champselysee.jpg', lat: 48.8698, lng: 2.3079,
      i18n: {
        en: { name: 'Champs-Élysées', desc: 'Already visited — the grand avenue of shops and cafés.', duration: '2 hrs', best: 'Afternoon' },
        ur: { name: 'شانزے لیزے', desc: 'پہلے دیکھا جا چکا ہے — دکانوں اور کیفوں کی شاندار سڑک۔', duration: '2 گھنٹے', best: 'دوپہر' },
        fr: { name: 'Champs-Élysées', desc: 'Déjà visités — la grande avenue des boutiques et cafés.', duration: '2 h', best: 'Après-midi' }
      } },
    { id: 'sacrecoeur', visited: false, category: 'culture', emoji: '⛪', img: 'images/sacre-coeur.jpg', lat: 48.8867, lng: 2.3431,
      i18n: {
        en: { name: 'Sacré-Cœur & Montmartre', desc: "A hilltop basilica with the best panoramic view of Paris, plus the artists' square of Montmartre.", duration: '3 hrs', best: 'Morning' },
        ur: { name: 'ساکرے کور اور مونمارتغ', desc: 'پہاڑی پر واقع گرجا گھر جہاں سے پیرس کا بہترین نظارہ ملتا ہے، ساتھ ہی مونمارتغ کا مصوروں کا چوک۔', duration: '3 گھنٹے', best: 'صبح' },
        fr: { name: 'Sacré-Cœur & Montmartre', desc: "Une basilique en haut d'une colline avec la meilleure vue panoramique de Paris, ainsi que la place des artistes de Montmartre.", duration: '3 h', best: 'Matin' }
      } },
    { id: 'notredame', visited: false, category: 'culture', emoji: '🕍', img: 'images/notre-dame.jpg', lat: 48.853, lng: 2.3499,
      i18n: {
        en: { name: 'Notre-Dame & Sainte-Chapelle', desc: 'The newly reopened cathedral and the jewel-box stained-glass chapel nearby on Île de la Cité.', duration: '2-3 hrs', best: 'Morning' },
        ur: { name: 'نوتردام اور سینت شاپیل', desc: 'نئے سرے سے کھلنے والا مشہور گرجا گھر اور اس کے قریب رنگین شیشوں والا خوبصورت چیپل۔', duration: '2-3 گھنٹے', best: 'صبح' },
        fr: { name: 'Notre-Dame & Sainte-Chapelle', desc: "La cathédrale récemment rouverte et la chapelle aux vitraux joyaux tout près, sur l'Île de la Cité.", duration: '2-3 h', best: 'Matin' }
      } },
    { id: 'arc', visited: true, category: 'view', emoji: '🏛️', img: 'images/arc-de-triomphe.jpg', lat: 48.8738, lng: 2.295,
      i18n: {
        en: { name: 'Arc de Triomphe', desc: 'Already visited — the rooftop view straight down the Champs-Élysées.', duration: '1-2 hrs', best: 'Late afternoon' },
        ur: { name: 'آرک دی تریومف', desc: 'پہلے دیکھا جا چکا ہے — چھت سے سیدھا شانزے لیزے کا خوبصورت نظارہ۔', duration: '1-2 گھنٹے', best: 'سہ پہر' },
        fr: { name: 'Arc de Triomphe', desc: 'Déjà visité — la vue depuis le toit tout droit sur les Champs-Élysées.', duration: '1-2 h', best: "Fin d'après-midi" }
      } },
    { id: 'trocadero', visited: true, category: 'view', emoji: '🌳', img: 'images/trocadero.jpg', lat: 48.862, lng: 2.2887,
      i18n: {
        en: { name: 'Trocadéro Gardens', desc: 'Already visited — the postcard view of the Eiffel Tower from across the river.', duration: '1 hr', best: 'Golden hour' },
        ur: { name: 'تروکادیرو باغات', desc: 'پہلے دیکھا جا چکا ہے — دریا کے پار سے ایفل ٹاور کا خوبصورت نظارہ۔', duration: '1 گھنٹہ', best: 'غروب آفتاب کے قریب' },
        fr: { name: 'Jardins du Trocadéro', desc: "Déjà visités — la vue carte postale de la Tour Eiffel depuis l'autre côté de la rivière.", duration: '1 h', best: 'Heure dorée' }
      } },
    { id: 'louvre', visited: false, category: 'museum', emoji: '🖼️', img: 'images/louvre.jpg', lat: 48.8606, lng: 2.3376,
      i18n: {
        en: { name: 'Louvre Museum', desc: "The world's most famous museum — even a short visit to see the Mona Lisa and the glass pyramid is memorable.", duration: '3-4 hrs', best: 'Morning' },
        ur: { name: 'لوور میوزیم', desc: 'دنیا کا مشہور ترین عجائب گھر — مونا لیزا اور شیشے کے اہرام کو دیکھنے کے لیے مختصر وزٹ بھی یادگار ہے۔', duration: '3-4 گھنٹے', best: 'صبح' },
        fr: { name: 'Musée du Louvre', desc: 'Le musée le plus célèbre au monde — même une courte visite pour voir la Joconde et la pyramide de verre est mémorable.', duration: '3-4 h', best: 'Matin' }
      } },
    { id: 'orsay', visited: false, category: 'museum', emoji: '🎨', img: 'images/orsay.jpg', lat: 48.86, lng: 2.3266,
      i18n: {
        en: { name: "Musée d'Orsay", desc: 'A grand former railway station full of Impressionist masterpieces — smaller and calmer than the Louvre.', duration: '2-3 hrs', best: 'Morning' },
        ur: { name: 'میوزے دورسے', desc: 'ایک سابقہ ریلوے اسٹیشن جو تاثراتی فن پاروں سے بھرا ہوا ہے — لوور کے مقابلے میں چھوٹا اور پرسکون۔', duration: '2-3 گھنٹے', best: 'صبح' },
        fr: { name: "Musée d'Orsay", desc: "Une ancienne gare grandiose remplie de chefs-d'œuvre impressionnistes — plus petit et plus calme que le Louvre.", duration: '2-3 h', best: 'Matin' }
      } },
    { id: 'latin', visited: false, category: 'culture', emoji: '📚', img: 'images/latin-quarter.jpg', lat: 48.8462, lng: 2.3464,
      i18n: {
        en: { name: 'Latin Quarter & Panthéon', desc: "Historic student quarter, narrow streets, and the domed Panthéon resting place of France's great figures.", duration: '2-3 hrs', best: 'Afternoon' },
        ur: { name: 'لاطینی محلہ اور پینتھیون', desc: 'طلبہ کا تاریخی علاقہ، تنگ گلیاں، اور گنبد والا پینتھیون جہاں فرانس کی عظیم شخصیات آرام فرما ہیں۔', duration: '2-3 گھنٹے', best: 'دوپہر' },
        fr: { name: 'Quartier Latin & Panthéon', desc: "Quartier étudiant historique, rues étroites, et le Panthéon à coupole où reposent les grandes figures de France.", duration: '2-3 h', best: 'Après-midi' }
      } },
    { id: 'luxembourg', visited: false, category: 'walk', emoji: '🌷', img: 'images/luxembourg-gardens.jpg', lat: 48.8462, lng: 2.3372,
      i18n: {
        en: { name: 'Luxembourg Gardens', desc: 'A gentle, beautiful park to relax in — fountains, tree-lined paths, easy on the legs.', duration: '1-2 hrs', best: 'Late morning' },
        ur: { name: 'لکسمبرگ باغات', desc: 'آرام کرنے کے لیے ایک خوبصورت اور پرسکون باغ — فوارے، درختوں والے راستے، چلنے میں آسان۔', duration: '1-2 گھنٹے', best: 'دیر صبح' },
        fr: { name: 'Jardin du Luxembourg', desc: "Un parc paisible et magnifique pour se détendre — fontaines, allées bordées d'arbres, facile pour les jambes.", duration: '1-2 h', best: 'Fin de matinée' }
      } },
    { id: 'versailles', visited: false, category: 'daytrip', emoji: '👑', img: 'images/versailles.jpg', lat: 48.8049, lng: 2.1204,
      i18n: {
        en: { name: 'Palace of Versailles', desc: 'A full day trip to the opulent royal palace and gardens just outside Paris — book ahead, wear comfortable shoes.', duration: 'Full day', best: 'Early morning start' },
        ur: { name: 'محل ورسائی', desc: 'پیرس کے قریب شاہی محل اور باغات کا مکمل دن کا سفر — پہلے سے بکنگ کریں اور آرام دہ جوتے پہنیں۔', duration: 'پورا دن', best: 'صبح سویرے آغاز' },
        fr: { name: 'Château de Versailles', desc: "Une excursion d'une journée complète vers le somptueux palais royal et ses jardins juste à l'extérieur de Paris — réservez à l'avance, portez des chaussures confortables.", duration: 'Journée complète', best: 'Départ tôt le matin' }
      } },
    { id: 'chantilly', visited: false, category: 'daytrip', emoji: '🏰', img: 'images/chantilly.jpg', lat: 49.1936, lng: 2.487,
      i18n: {
        en: { name: 'Château de Chantilly', desc: 'A fairy-tale castle by a lake with beautiful gardens and a famous horse museum — being close to Verneuil-en-Halatte, it makes for an easy, relaxed day trip.', duration: 'Half day', best: 'Morning' },
        ur: { name: 'شاتو دی شانتیی', desc: 'جھیل کنارے ایک پریوں کی کہانی جیسا محل، خوبصورت باغات اور گھوڑوں کا مشہور عجائب گھر — ورنوے آں ہالات کے قریب ہونے کی وجہ سے ایک آسان اور آرام دہ دن کا سفر۔', duration: 'آدھا دن', best: 'صبح' },
        fr: { name: 'Château de Chantilly', desc: "Un château de conte de fées au bord d'un lac avec de beaux jardins et un célèbre musée du cheval — étant proche de Verneuil-en-Halatte, c'est une excursion facile et détendue.", duration: 'Demi-journée', best: 'Matin' }
      } },
    { id: 'birhakeim', visited: false, category: 'view', emoji: '🌉', img: 'images/pont-de-bir-hakeim.jpg', lat: 48.8535, lng: 2.2885,
      i18n: {
        en: { name: 'Pont de Bir-Hakeim', desc: 'Quiet, romantic two-level bridge with a great Eiffel Tower angle over the Seine.', duration: '30-45 mins', best: 'Evening' },
        ur: { name: 'پونٹ دی بیر حکیم', desc: 'ایک پرسکون، رومانوی دو منزلہ پل جہاں سے دریائے سین کے اوپر ایفل ٹاور کا شاندار زاویہ نظر آتا ہے۔', duration: '30-45 منٹ', best: 'شام' },
        fr: { name: 'Pont de Bir-Hakeim', desc: "Un pont romantique et tranquille à deux niveaux avec un bel angle sur la Tour Eiffel au-dessus de la Seine.", duration: '30-45 min', best: 'Soir' }
      } },
    { id: 'vertgalant', visited: false, category: 'view', emoji: '🌳', img: 'images/square-du-vert-galant.jpg', lat: 48.8567, lng: 2.3412,
      i18n: {
        en: { name: 'Square du Vert-Galant', desc: 'Peaceful garden at the tip of Île de la Cité, more about riverside calm than panorama.', duration: '30-45 mins', best: 'Late afternoon' },
        ur: { name: 'سکوائر دی ویغ گالاں', desc: 'آئل دی لا سیتے کی نوک پر واقع پرسکون باغ، پانورامے کے بجائے دریا کنارے سکون پر مرکوز۔', duration: '30-45 منٹ', best: 'سہ پہر' },
        fr: { name: 'Square du Vert-Galant', desc: "Jardin paisible à la pointe de l'Île de la Cité, plus pour le calme au bord de l'eau que pour le panorama.", duration: '30-45 min', best: "Fin d'après-midi" }
      } },
    { id: 'tuileries', visited: false, category: 'view', emoji: '🌷', img: 'images/tuileries-garden.jpg', lat: 48.8635, lng: 2.3275,
      i18n: {
        en: { name: 'Tuileries Garden', desc: 'Nice elevated view toward Place de la Concorde and the Eiffel Tower from the upper terrace.', duration: '1 hr', best: 'Afternoon' },
        ur: { name: 'توئلری باغ', desc: 'اوپر کی چھت سے پلاس دی لا کونکورد اور ایفل ٹاور کا خوبصورت بلند منظر۔', duration: '1 گھنٹہ', best: 'دوپہر' },
        fr: { name: 'Jardin des Tuileries', desc: 'Belle vue surélevée vers la Place de la Concorde et la Tour Eiffel depuis la terrasse supérieure.', duration: '1 h', best: 'Après-midi' }
      } },
    { id: 'concorde', visited: false, category: 'view', emoji: '⛲', img: 'images/place-de-la-concorde.jpg', lat: 48.8656, lng: 2.3212,
      i18n: {
        en: { name: 'Place de la Concorde', desc: "It's an open square with sweeping sightlines toward the Champs-Élysées, the Eiffel Tower, and the Tuileries, rather than a museum or a walkable culture site in the way Notre-Dame or the Panthéon are.", duration: '30-45 mins', best: 'Afternoon' },
        ur: { name: 'پلاس دی لا کونکورد', desc: 'ایک کھلا چوک جہاں سے شانزے لیزے، ایفل ٹاور اور توئلری کی طرف وسیع نظارے ملتے ہیں — یہ کسی عجائب گھر یا نوتردام و پینتھیون جیسی ثقافتی جگہ کے بجائے محض ایک قابلِ سیر مقام ہے۔', duration: '30-45 منٹ', best: 'دوپہر' },
        fr: { name: 'Place de la Concorde', desc: "Une place ouverte avec des perspectives dégagées vers les Champs-Élysées, la Tour Eiffel et les Tuileries, plutôt qu'un musée ou un site culturel à parcourir comme le sont Notre-Dame ou le Panthéon.", duration: '30-45 min', best: 'Après-midi' }
      } },
    { id: 'lafayetterooftop', visited: false, category: 'view', emoji: '🏙️', img: 'images/galeries-lafayette-rooftop.jpg', lat: 48.8737, lng: 2.3323,
      i18n: {
        en: { name: 'Galeries Lafayette rooftop', desc: 'Free 360° terrace with the Eiffel Tower and Opéra Garnier in view, much less crowded than paid observation decks.', duration: '30-45 mins', best: 'Golden hour' },
        ur: { name: 'گیلری لافایت کی چھت', desc: 'مفت 360° چھت جہاں سے ایفل ٹاور اور اوپیرا گارنیے نظر آتے ہیں، ادائیگی والے مشاہداتی ڈیکس کے مقابلے میں کہیں کم ہجوم۔', duration: '30-45 منٹ', best: 'غروب آفتاب کے قریب' },
        fr: { name: 'Toit des Galeries Lafayette', desc: "Terrasse gratuite à 360° avec vue sur la Tour Eiffel et l'Opéra Garnier, bien moins fréquentée que les plateformes d'observation payantes.", duration: '30-45 min', best: 'Heure dorée' }
      } },
    { id: 'cableacreteil', visited: false, category: 'view', emoji: '🚡', img: 'images/cable-a-creteil.jpg', lat: 48.7909, lng: 2.4556,
      i18n: {
        en: { name: 'Câble A (Créteil Cable Car)', desc: 'The first urban cable car in the Paris region — glide over the A86 motorway and green space between Créteil and Villeneuve-Saint-Georges for sweeping aerial views over the southeastern suburbs, Créteil Lake and forest.', duration: '20-30 mins', best: 'Clear daylight' },
        ur: { name: 'کیبل اے (کریتے کیبل کار)', desc: 'پیرس کے علاقے کی پہلی شہری کیبل کار — کریتے اور ویلنوو-سان-جارج کے درمیان A86 موٹروے اور سبزہ زاروں کے اوپر سے گزرتے ہوئے جنوب مشرقی مضافات، کریتے جھیل اور جنگل کا شاندار فضائی نظارہ ملتا ہے۔', duration: '20-30 منٹ', best: 'صاف دن کی روشنی میں' },
        fr: { name: 'Câble A (téléphérique de Créteil)', desc: "Le premier téléphérique urbain de la région parisienne — survolez l'autoroute A86 et les espaces verts entre Créteil et Villeneuve-Saint-Georges pour une vue aérienne saisissante sur les banlieues du sud-est, le lac de Créteil et la forêt.", duration: '20-30 min', best: 'Journée ensoleillée' }
      } }
  ];

  function placeText(place) {
    return place.i18n[LANG] || place.i18n.en;
  }

  function streetViewUrl(place) {
    if (place.lat == null || place.lng == null) return '';
    // "layer=c" requests the classic Street View coverage layer (genuine
    // car/trekker street-level imagery) rather than the newer pano API,
    // which for famous landmarks can snap to an indoor/virtual-tour photo
    // instead of the adjacent street.
    return 'https://www.google.com/maps?layer=c&cbll=' + place.lat + ',' + place.lng;
  }

  function placeNameHTML(place, name) {
    const url = streetViewUrl(place);
    if (!url) return name;
    return '<a class="place-streetview-link" href="' + url + '" target="_blank" rel="noopener" title="' +
      t('streetview_link_title') + '">' + name + ' <span class="sv-icon">🧭</span></a>';
  }

  function youtubeSearchUrl(place, tr) {
    const name = (place.i18n.en ? place.i18n.en.name : tr.name);
    return 'https://www.youtube.com/results?search_query=' + encodeURIComponent(name + ' France');
  }

  function youtubeLinkHTML(place, tr) {
    const url = youtubeSearchUrl(place, tr);
    return '<a class="place-youtube-link" href="' + url + '" target="_blank" rel="noopener" title="' +
      t('youtube_link_title') + '">🎬 <span>' + t('youtube_link_label') + '</span></a>';
  }

  const CATEGORY_ORDER = ['all', 'culture', 'view', 'museum', 'walk', 'daytrip'];
  const CATEGORY_KEYS = { all: 'cat_all', culture: 'cat_culture', view: 'cat_view', museum: 'cat_museum', walk: 'cat_walk', daytrip: 'cat_daytrip' };

  /* ===================== CUSTOM PLACES (user-added cards, this device only) ===================== */
  const CUSTOM_PLACES_KEY = 'europeTripCustomPlaces';

  function loadCustomPlaces() {
    try { return JSON.parse(localStorage.getItem(CUSTOM_PLACES_KEY)) || []; } catch (e) { return []; }
  }
  function saveCustomPlaces(list) {
    localStorage.setItem(CUSTOM_PLACES_KEY, JSON.stringify(list));
  }
  function getAllPlaces() {
    return PLACES.concat(loadCustomPlaces());
  }

  /* ===================== MOTION HELPERS ===================== */
  function motionOk() {
    return !window.matchMedia || !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function animateNumberTo(el, newValue, duration) {
    if (!el) return;
    const startValue = parseFloat(el.textContent.replace(/[^\d.-]/g, '')) || 0;
    if (startValue === newValue || !motionOk()) { el.textContent = newValue; return; }
    duration = duration || 550;
    const startTime = performance.now();
    function tick(now) {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (newValue - startValue) * eased);
      el.textContent = current;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = newValue;
    }
    requestAnimationFrame(tick);
  }

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
    return date.toLocaleDateString(LANG === 'fr' ? 'fr-FR' : 'en-GB', o);
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

    const sisterFirstEnd = addDays(cursor, state.sisterFirst);
    legs.push({
      key: 'sisterFirst', name: t('leg_sisterFirst_name'), color: COLORS.sisterFirst,
      start: cursor, end: sisterFirstEnd,
      detail: t('leg_sisterFirst_detail', { date: fmt(TRIP_START) })
    });
    cursor = sisterFirstEnd;

    const withYouEnd = addDays(cursor, state.withYou);
    legs.push({
      key: 'withYou', name: t('leg_withYou_name'), color: COLORS.withYou,
      start: cursor, end: withYouEnd,
      detail: t('leg_withYou_detail')
    });
    cursor = withYouEnd;

    const AbdullahEnd = addDays(cursor, state.Abdullah);
    legs.push({
      key: 'Abdullah', name: t('leg_Abdullah_name'), color: COLORS.Abdullah,
      start: cursor, end: AbdullahEnd,
      detail: t('leg_Abdullah_detail')
    });
    cursor = AbdullahEnd;

    const sisterFinalEnd = addDays(cursor, state.sisterFinal);
    legs.push({
      key: 'sisterFinal', name: t('leg_sisterFinal_name'), color: COLORS.sisterFinal,
      start: cursor, end: sisterFinalEnd,
      detail: t('leg_sisterFinal_detail', { date: fmt(TRIP_END) })
    });

    return { legs, calculatedEnd: sisterFinalEnd };
  }

  /* ===================== COUNTDOWN ===================== */
  function setFlipDigit(el, value) {
    const str = String(value);
    if (el.textContent === str) return;
    if (!motionOk()) { el.textContent = str; return; }
    el.classList.add('flip');
    setTimeout(() => { el.textContent = str; }, 150);
    setTimeout(() => { el.classList.remove('flip'); }, 300);
  }

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
      setFlipDigit(els.days, 0); setFlipDigit(els.hours, 0); setFlipDigit(els.mins, 0); setFlipDigit(els.secs, 0);
      return;
    }
    const totalSecs = Math.floor(diff / 1000);
    setFlipDigit(els.days, Math.floor(totalSecs / 86400));
    setFlipDigit(els.hours, Math.floor((totalSecs % 86400) / 3600));
    setFlipDigit(els.mins, Math.floor((totalSecs % 3600) / 60));
    setFlipDigit(els.secs, totalSecs % 60);
  }

  function renderRouteStrip() {
    const stops = tArr('route_stops');
    const el = document.getElementById('routeStrip');
    el.innerHTML = stops.map((s, i) =>
      `<span class="stop">${s}</span>${i < stops.length - 1 ? '<span class="arrow">→</span>' : ''}`
    ).join('');
  }

  /* ===================== PLANNER ===================== */
  function formatDuration(days) {
    if (displayUnit === 'days') {
      return days + ' ' + (days === 1 ? t('day_singular') : t('day_plural'));
    }
    const weeks = Math.floor(days / 7);
    const rem = days % 7;
    const weeksPart = weeks + ' ' + (weeks === 1 ? t('week_singular') : t('week_plural'));
    if (rem === 0) return weeksPart;
    const daysPart = rem + ' ' + (rem === 1 ? t('day_singular') : t('day_plural'));
    return weeks === 0 ? daysPart : weeksPart + ' ' + daysPart;
  }

  function renderPlanner() {
    document.getElementById('val-sisterFirst').textContent = formatDuration(state.sisterFirst);
    document.getElementById('val-withYou').textContent = formatDuration(state.withYou);
    document.getElementById('val-Abdullah').textContent = formatDuration(state.Abdullah);
    document.getElementById('val-sisterFinal').textContent = formatDuration(state.sisterFinal);

    ['sisterFirst', 'withYou', 'Abdullah', 'sisterFinal'].forEach(key => {
      const input = document.getElementById(key);
      const min = parseInt(input.min, 10);
      const max = parseInt(input.max, 10);
      const minusBtn = document.querySelector('.stepper-btn[data-key="' + key + '"][data-dir="-1"]');
      const plusBtn = document.querySelector('.stepper-btn[data-key="' + key + '"][data-dir="1"]');
      if (minusBtn) minusBtn.disabled = state[key] <= min;
      if (plusBtn) plusBtn.disabled = state[key] >= max;
    });

    const { calculatedEnd } = computeSchedule();
    const totalDays = state.sisterFirst + state.withYou + state.Abdullah + state.sisterFinal;
    const statusEl = document.getElementById('plannerStatus');

    if (sameDay(calculatedEnd, TRIP_END)) {
      statusEl.className = 'planner-status ok';
      statusEl.textContent = t('planner_status_ok', { weeks: formatDuration(totalDays) });
    } else {
      const diffDays = Math.round((calculatedEnd - TRIP_END) / 86400000);
      statusEl.className = 'planner-status warn';
      statusEl.textContent = diffDays > 0
        ? t('planner_status_over', { days: diffDays })
        : t('planner_status_under', { days: Math.abs(diffDays) });
    }

    const totalWeeksVal = totalDays / 7;
    const sumTotalEl = document.getElementById('sum-total');
    if (Number.isInteger(totalWeeksVal)) {
      animateNumberTo(sumTotalEl, totalWeeksVal);
    } else {
      sumTotalEl.textContent = totalWeeksVal.toFixed(1);
    }
    animateNumberTo(document.getElementById('sum-days'), totalDays);
    animateNumberTo(document.getElementById('sum-sister'), state.sisterFirst + state.sisterFinal);
    animateNumberTo(document.getElementById('sum-you'), state.withYou);

    document.getElementById('sum-end').textContent = fmtShort(calculatedEnd);

    renderTripDonut(totalDays);
  }

  let donutTooltipHideTimer = null;

  function renderTripDonut(totalDays) {
    const svg = document.getElementById('tripDonutSvg');
    const legend = document.getElementById('tripDonutLegend');
    const centerNum = document.getElementById('donutCenterNum');
    const tooltip = document.getElementById('donutTooltip');
    if (!svg || !legend || !centerNum) return;

    const { legs } = computeSchedule();
    const R = 58, CX = 70, CY = 70;
    const circumference = 2 * Math.PI * R;

    let cumulative = 0;
    const segMarkup = legs.map(leg => {
      const days = state[leg.key];
      const fraction = totalDays > 0 ? days / totalDays : 0;
      const len = fraction * circumference;
      const dashoffset = -cumulative;
      cumulative += len;
      return '<circle class="donut-seg" data-key="' + leg.key + '" cx="' + CX + '" cy="' + CY + '" r="' + R + '" ' +
        'stroke="' + leg.color + '" stroke-dasharray="' + len + ' ' + (circumference - len) + '" ' +
        'stroke-dashoffset="' + dashoffset + '" transform="rotate(-90 ' + CX + ' ' + CY + ')" ' +
        'tabindex="0" role="button" aria-label="' + leg.name + '"></circle>';
    }).join('');

    svg.innerHTML = '<circle class="donut-track" cx="' + CX + '" cy="' + CY + '" r="' + R + '"></circle>' + segMarkup;
    animateNumberTo(centerNum, totalDays);

    legend.innerHTML = legs.map(leg => (
      '<li data-key="' + leg.key + '">' +
        '<span class="dot" style="background:' + leg.color + '"></span>' +
        '<span class="name">' + leg.name + '</span>' +
        '<span class="weeks">' + formatDuration(state[leg.key]) + '</span>' +
      '</li>'
    )).join('');

    function tooltipText(leg) {
      return leg.name + ' — ' + formatDuration(state[leg.key]) + ' (' + fmtShort(leg.start) + ' → ' + fmtShort(leg.end) + ')';
    }
    function showTooltip(evt, leg) {
      clearTimeout(donutTooltipHideTimer);
      tooltip.textContent = tooltipText(leg);
      tooltip.classList.add('visible');
      moveTooltip(evt);
    }
    function moveTooltip(evt) {
      const point = evt.touches ? evt.touches[0] : evt;
      tooltip.style.left = (point.clientX + 14) + 'px';
      tooltip.style.top = (point.clientY + 14) + 'px';
    }
    function hideTooltip() {
      donutTooltipHideTimer = setTimeout(() => tooltip.classList.remove('visible'), 80);
    }
    function goToTimeline() {
      hideTooltip();
      openCollapsibleSection('timeline');
      document.getElementById('timeline').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    svg.querySelectorAll('.donut-seg').forEach(seg => {
      const leg = legs.find(l => l.key === seg.dataset.key);
      seg.addEventListener('mouseenter', (e) => showTooltip(e, leg));
      seg.addEventListener('mousemove', moveTooltip);
      seg.addEventListener('mouseleave', hideTooltip);
      seg.addEventListener('focus', (e) => showTooltip(e, leg));
      seg.addEventListener('blur', hideTooltip);
      seg.addEventListener('click', goToTimeline);
      seg.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goToTimeline(); } });
    });

    legend.querySelectorAll('li').forEach(li => {
      const leg = legs.find(l => l.key === li.dataset.key);
      li.addEventListener('mouseenter', (e) => showTooltip(e, leg));
      li.addEventListener('mousemove', moveTooltip);
      li.addEventListener('mouseleave', hideTooltip);
      li.addEventListener('click', goToTimeline);
    });
  }

  function initPlanner() {
    ['sisterFirst', 'withYou', 'Abdullah', 'sisterFinal'].forEach(key => {
      const input = document.getElementById(key);
      input.value = state[key];
      input.addEventListener('input', () => {
        state[key] = parseInt(input.value, 10);
        renderAll();
      });
    });

    document.querySelectorAll('.stepper-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        const dir = parseInt(btn.dataset.dir, 10);
        const input = document.getElementById(key);
        const min = parseInt(input.min, 10);
        const max = parseInt(input.max, 10);
        const newVal = Math.max(min, Math.min(max, state[key] + dir));
        if (newVal === state[key]) return;
        state[key] = newVal;
        input.value = newVal;
        renderAll();
      });
    });
  }

  function initUnitToggle() {
    const radios = document.querySelectorAll('input[name="displayUnit"]');
    if (!radios.length) return;
    radios.forEach(radio => {
      radio.checked = radio.value === displayUnit;
      radio.addEventListener('change', () => {
        if (!radio.checked) return;
        displayUnit = radio.value;
        try { localStorage.setItem('europeTripDisplayUnit', displayUnit); } catch (e) { /* ignore */ }
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

    renderTimelineNowMarker(container);
  }

  function renderTimelineNowMarker(container) {
    const now = new Date();
    if (now < TRIP_START || now > TRIP_END) return;
    const fraction = (now - TRIP_START) / (TRIP_END - TRIP_START);
    const marker = document.createElement('div');
    marker.className = 'timeline-now-marker';
    marker.innerHTML = '<span class="pulse"></span><span class="now-label">' + t('timeline_now_label') + '</span>';
    container.appendChild(marker);
    requestAnimationFrame(() => {
      marker.style.top = (fraction * container.scrollHeight) + 'px';
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

  function mediaHTML(src, emoji) {
    if (src) {
      return `<img src="${src}" alt="" loading="lazy"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <span class="emoji-fallback" style="display:none">${emoji}</span>`;
    }
    return `<span class="emoji-fallback" style="display:flex">${emoji}</span>`;
  }

  function placeMediaHTML(place) {
    const custom = getCustomImageSrc(place.id);
    const src = custom || place.img;
    const deleteBtn = place.custom
      ? `<button type="button" class="place-delete-btn" data-deleteid="${place.id}" title="${t('delete_place_title')}">🗑</button>`
      : '';
    return `${mediaHTML(src, place.emoji)}
      <span class="place-badge">${place.visited ? t('badge_revisit') : t('badge_new')}</span>
      ${deleteBtn}
      <button type="button" class="media-edit-btn" data-editid="${place.id}">${custom || (place.custom && place.img) ? t('edit_photo_btn') : t('add_photo_btn')}</button>`;
  }

  function bindPlaceCardButtons(scope) {
    scope.querySelectorAll('.media-edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openImageEditModal(btn.dataset.editid);
      });
    });
    scope.querySelectorAll('.place-delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!confirm(t('confirm_delete_place'))) return;
        saveCustomPlaces(loadCustomPlaces().filter(p => p.id !== btn.dataset.deleteid));
        renderPlaceGrid();
        renderGallery();
        renderItinerary();
      });
    });
  }

  function renderPlaceGrid() {
    const grid = document.getElementById('placeGrid');
    const newPlaces = getAllPlaces().filter(p => !p.visited);
    const list = activeFilter === 'all' ? newPlaces : newPlaces.filter(p => p.category === activeFilter);
    grid.innerHTML = list.map(p => {
      const tr = placeText(p);
      return `
      <div class="place-card">
        <div class="place-media">${placeMediaHTML(p)}</div>
        <div class="place-body">
          <div class="meta">${t(CATEGORY_KEYS[p.category])}</div>
          <h4>${placeNameHTML(p, tr.name)}</h4>
          <p>${tr.desc}</p>
          <div class="stats"><span>⏱ ${tr.duration}</span><span>☀ ${tr.best}</span></div>
          <div class="place-quick-links">${youtubeLinkHTML(p, tr)}</div>
        </div>
      </div>
    `;
    }).join('') || `<p>${t('no_places_msg')}</p>`;
    bindPlaceCardButtons(grid);
  }

  /* ===================== DAY-BY-DAY ITINERARY ===================== */
  function renderItinerary() {
    const { legs } = computeSchedule();
    const withYouLeg = legs.find(l => l.key === 'withYou');
    const totalDays = Math.round((withYouLeg.end - withYouLeg.start) / 86400000);
    const restDays = Math.min(7, totalDays);
    const newPlaces = getAllPlaces().filter(p => !p.visited);

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
    const list = getAllPlaces().filter(p => activeGalleryTab === 'new' ? !p.visited : p.visited);
    grid.innerHTML = list.map(p => {
      const custom = getCustomImageSrc(p.id);
      const src = custom || p.img;
      const tr = placeText(p);
      const deleteBtn = p.custom
        ? `<button type="button" class="place-delete-btn" data-deleteid="${p.id}" title="${t('delete_place_title')}">🗑</button>`
        : '';
      return `
      <div class="gallery-item" data-id="${p.id}">
        ${mediaHTML(src, p.emoji)}
        ${deleteBtn}
        <button type="button" class="media-edit-btn" data-editid="${p.id}">${custom ? t('edit_btn_short') : t('add_photo_btn')}</button>
        <div class="cap">${placeNameHTML(p, tr.name)}</div>
      </div>
    `;
    }).join('');

    grid.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => openLightbox(item.dataset.id, item));
    });
    grid.querySelectorAll('.place-streetview-link').forEach(link => {
      link.addEventListener('click', e => e.stopPropagation());
    });
    bindPlaceCardButtons(grid);
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

  function setLightboxDownload(src) {
    const btn = document.getElementById('lightboxDownload');
    if (!btn) return;
    if (src) {
      btn.href = src;
      btn.style.display = 'inline-flex';
    } else {
      btn.removeAttribute('href');
      btn.style.display = 'none';
    }
  }

  function openLightbox(id, sourceEl) {
    const place = getAllPlaces().find(p => p.id === id);
    if (!place) return;
    const tr = placeText(place);
    document.getElementById('lightboxTitle').textContent = tr.name;
    document.getElementById('lightboxDesc').textContent = tr.desc;
    const media = document.getElementById('lightboxMedia');
    const custom = getCustomImageSrc(place.id);
    media.innerHTML = mediaHTML(custom || place.img, place.emoji);
    setLightboxDownload(null);
    document.getElementById('lightbox').classList.add('open');
    animateLightboxFrom(sourceEl);
  }

  function animateLightboxFrom(sourceEl) {
    if (!sourceEl || !motionOk()) return;
    const media = document.getElementById('lightboxMedia');
    const startRect = sourceEl.getBoundingClientRect();
    requestAnimationFrame(() => {
      const endRect = media.getBoundingClientRect();
      if (!endRect.width || !endRect.height) return;
      const scaleX = startRect.width / endRect.width;
      const scaleY = startRect.height / endRect.height;
      const translateX = (startRect.left + startRect.width / 2) - (endRect.left + endRect.width / 2);
      const translateY = (startRect.top + startRect.height / 2) - (endRect.top + endRect.height / 2);
      media.style.transition = 'none';
      media.style.transform = 'translate(' + translateX + 'px, ' + translateY + 'px) scale(' + scaleX + ', ' + scaleY + ')';
      media.style.opacity = '0.4';
      requestAnimationFrame(() => {
        media.style.transition = 'transform .38s cubic-bezier(.2,.8,.2,1), opacity .28s ease';
        media.style.transform = 'translate(0,0) scale(1,1)';
        media.style.opacity = '1';
      });
    });
  }

  function closeLightbox() {
    const media = document.getElementById('lightboxMedia');
    const playingVideo = media.querySelector('video');
    if (playingVideo) playingVideo.pause();
    media.style.transition = '';
    media.style.transform = '';
    media.style.opacity = '';
    document.getElementById('lightbox').classList.remove('open');
  }

  function initLightbox() {
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightbox').addEventListener('click', (e) => {
      if (e.target.id === 'lightbox') closeLightbox();
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
        const wasAllApproved = PEOPLE.every(p => (data[p.id] || {}).approved);
        data[personId] = data[personId] || { stars: 0, approved: false };
        data[personId].approved = !data[personId].approved;
        saveApproval(data);
        renderApproval();
        const nowAllApproved = PEOPLE.every(p => (data[p.id] || {}).approved);
        if (!wasAllApproved && nowAllApproved) triggerConfetti();
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
    document.querySelectorAll('#imageEditModal .modal-tabs button').forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
    document.getElementById('imageUrlInput').style.display = mode === 'url' ? 'block' : 'none';
    document.getElementById('imageFileDrop').style.display = mode === 'file' ? 'block' : 'none';
  }

  function openImageEditModal(placeId) {
    const place = getAllPlaces().find(p => p.id === placeId);
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
    document.querySelectorAll('#imageEditModal .modal-tabs button').forEach(btn => {
      btn.addEventListener('click', () => setModalMode(btn.dataset.mode));
    });
    document.getElementById('imageFileInput').addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      pendingFileSrc = await compressImage(file);
      document.getElementById('imageEditPreview').innerHTML = `<img src="${pendingFileSrc}" alt="">`;
    });
    document.getElementById('imageSaveBtn').addEventListener('click', () => {
      const mode = document.querySelector('#imageEditModal .modal-tabs button.active').dataset.mode;
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

  /* ===================== ADD PLACE MODAL (user-added cards, this device only) ===================== */
  let addPlacePendingFileSrc = null;
  let addPlaceDefaultVisited = false;

  function populateAddPlaceCategorySelect() {
    const select = document.getElementById('addPlaceCategory');
    select.innerHTML = CATEGORY_ORDER.filter(c => c !== 'all')
      .map(c => `<option value="${c}">${t(CATEGORY_KEYS[c])}</option>`).join('');
  }

  function setAddPlaceModalMode(mode) {
    document.querySelectorAll('#addPlaceModal .modal-tabs button').forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
    document.getElementById('addPlaceUrlInput').style.display = mode === 'url' ? 'block' : 'none';
    document.getElementById('addPlaceFileDrop').style.display = mode === 'file' ? 'block' : 'none';
  }

  function openAddPlaceModal(defaultVisited) {
    addPlaceDefaultVisited = !!defaultVisited;
    addPlacePendingFileSrc = null;
    document.getElementById('addPlaceName').value = '';
    document.getElementById('addPlaceDesc').value = '';
    document.getElementById('addPlaceDuration').value = '';
    document.getElementById('addPlaceBest').value = '';
    document.getElementById('addPlaceUrlInput').value = '';
    document.getElementById('addPlaceFileInput').value = '';
    document.getElementById('addPlaceVisited').value = String(addPlaceDefaultVisited);
    populateAddPlaceCategorySelect();
    setAddPlaceModalMode('url');
    document.getElementById('addPlaceModal').classList.add('open');
  }

  function closeAddPlaceModal() {
    document.getElementById('addPlaceModal').classList.remove('open');
  }

  function initAddPlaceModal() {
    document.getElementById('addPlaceBtnGuide').addEventListener('click', () => openAddPlaceModal(false));
    document.getElementById('addPlaceBtnGallery').addEventListener('click', () => openAddPlaceModal(activeGalleryTab === 'visited'));

    document.querySelectorAll('#addPlaceModal .modal-tabs button').forEach(btn => {
      btn.addEventListener('click', () => setAddPlaceModalMode(btn.dataset.mode));
    });
    document.getElementById('addPlaceFileInput').addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      addPlacePendingFileSrc = await compressImage(file);
    });

    document.getElementById('addPlaceSaveBtn').addEventListener('click', () => {
      const name = document.getElementById('addPlaceName').value.trim();
      if (!name) { alert(t('add_place_name_required_alert')); return; }
      const mode = document.querySelector('#addPlaceModal .modal-tabs button.active').dataset.mode;
      const photo = mode === 'file' ? addPlacePendingFileSrc : document.getElementById('addPlaceUrlInput').value.trim();
      const desc = document.getElementById('addPlaceDesc').value.trim();
      const duration = document.getElementById('addPlaceDuration').value.trim();
      const best = document.getElementById('addPlaceBest').value.trim();
      const category = document.getElementById('addPlaceCategory').value;
      const visited = document.getElementById('addPlaceVisited').value === 'true';

      const entry = {
        id: uid('cp'), custom: true, visited, category, emoji: '📍', img: photo || '',
        i18n: {
          en: { name, desc, duration, best },
          ur: { name, desc, duration, best }
        }
      };
      const list = loadCustomPlaces();
      list.push(entry);
      saveCustomPlaces(list);
      closeAddPlaceModal();
      renderFilterBar();
      renderPlaceGrid();
      renderGallery();
      renderItinerary();
    });

    document.getElementById('addPlaceCancelBtn').addEventListener('click', closeAddPlaceModal);
    document.getElementById('addPlaceClose').addEventListener('click', closeAddPlaceModal);
    document.getElementById('addPlaceModal').addEventListener('click', (e) => {
      if (e.target.id === 'addPlaceModal') closeAddPlaceModal();
    });
  }

  /* ===================== STATIC SOUVENIRS (from images/souvenirs, shared for everyone) ===================== */
  // Each category checks for images/souvenirs/{prefix}1.jpg .. {prefix}{count}.jpg (or .jpeg/.png/.webp),
  // and separately images/souvenirs/{prefix}vid1.mp4 .. {prefix}vid{videoCount}.mp4 (or .mov/.webm) for videos.
  // Any slot with no matching uploaded file just stays invisible, so wiring up the full count costs nothing.
  const STATIC_SOUVENIR_CATEGORIES = [
    { id: 'bonn', prefix: 'bonn', count: 30, videoCount: 30, labelKey: 'souvenir_cat_bonn' },
    {
      id: 'paris', prefix: 'paris', count: 30, videoCount: 30, labelKey: 'souvenir_cat_paris',
      // Pre-existing example photos already in the repo, shown first in this category.
      extraPhotos: ['images/souvenirs/souvenir1.jpg', 'images/souvenirs/souvenir2.jpg', 'images/souvenirs/souvenir3.jpg']
    },
    { id: 'stuttgart', prefix: 'stuttgart', count: 30, videoCount: 30, labelKey: 'souvenir_cat_stuttgart' }
  ];
  const STATIC_SOUVENIR_EXTS = ['jpg', 'jpeg', 'png', 'webp'];
  const STATIC_SOUVENIR_VIDEO_EXTS = ['mp4', 'mov', 'webm'];
  let activeStaticSouvenirCat = 'bonn';

  // Per-device "hide from view" list for static souvenirs. This does NOT delete the
  // actual file from the GitHub repo (a static site has no way to do that safely) —
  // it just stops rendering that src on whichever device clicked hide.
  const HIDDEN_STATIC_SOUVENIRS_KEY = 'europeTripHiddenStaticSouvenirs';
  function loadHiddenStaticSouvenirs() {
    try { return JSON.parse(localStorage.getItem(HIDDEN_STATIC_SOUVENIRS_KEY)) || []; } catch (e) { return []; }
  }
  function hideStaticSouvenir(src) {
    const hidden = loadHiddenStaticSouvenirs();
    if (!hidden.includes(src)) hidden.push(src);
    localStorage.setItem(HIDDEN_STATIC_SOUVENIRS_KEY, JSON.stringify(hidden));
  }

  function checkImageExists(src) {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
    });
  }

  function checkVideoExists(src) {
    return new Promise(resolve => {
      const vid = document.createElement('video');
      vid.onloadedmetadata = () => resolve(true);
      vid.onerror = () => resolve(false);
      vid.src = src;
    });
  }

  // Tries each extension in turn for a given base path and resolves to the first one that
  // actually loads (or null if none of them exist), so uploads don't need an exact extension match.
  async function resolveStaticSouvenirSrc(basePath) {
    for (const ext of STATIC_SOUVENIR_EXTS) {
      const src = `${basePath}.${ext}`;
      if (await checkImageExists(src)) return src;
    }
    return null;
  }

  async function resolveStaticSouvenirVideoSrc(basePath) {
    for (const ext of STATIC_SOUVENIR_VIDEO_EXTS) {
      const src = `${basePath}.${ext}`;
      if (await checkVideoExists(src)) return src;
    }
    return null;
  }

  let staticSouvenirSrcs = [];
  let staticShareMode = false;

  // Resolving a category's slots means up to ~200 existence-check requests (30 photo
  // slots x 4 extensions + 30 video slots x 3 extensions). Two things made rapid tab
  // switching feel broken: (1) nothing changed on screen for a while so a click looked
  // like it did nothing, and (2) overlapping renders could resolve out of order, so a
  // slow earlier click could silently clobber a faster later one. Fixed by caching each
  // category's resolved (existing) files for the rest of the session — so switching back
  // to an already-visited tab is instant — and by a generation token that discards a
  // render's result if a newer one has started since.
  const staticSouvenirCache = new Map();
  let staticSouvenirRenderToken = 0;

  async function renderStaticSouvenirs() {
    const myToken = ++staticSouvenirRenderToken;
    const grid = document.getElementById('staticSouvenirGrid');
    const cat = STATIC_SOUVENIR_CATEGORIES.find(c => c.id === activeStaticSouvenirCat) || STATIC_SOUVENIR_CATEGORIES[0];

    let allPhotos, allVideos;
    if (staticSouvenirCache.has(cat.id)) {
      ({ photos: allPhotos, videos: allVideos } = staticSouvenirCache.get(cat.id));
    } else {
      grid.innerHTML = `<p class="souvenir-empty">${t('souvenirs_loading')}</p>`;
      const shareBtn0 = document.getElementById('staticSouvenirShareBtn');
      if (shareBtn0) shareBtn0.style.display = 'none';

      const photoSlots = Array.from({ length: cat.count }, (_, idx) => idx + 1);
      const videoSlots = Array.from({ length: cat.videoCount || 0 }, (_, idx) => idx + 1);
      const extraPhotos = cat.extraPhotos || [];
      const [extraResults, photoResults, videoResults] = await Promise.all([
        Promise.all(extraPhotos.map(src => checkImageExists(src).then(ok => ({ src: ok ? src : null, n: src })))),
        Promise.all(photoSlots.map(n => resolveStaticSouvenirSrc(`images/souvenirs/${cat.prefix}${n}`).then(src => ({ src, n })))),
        Promise.all(videoSlots.map(n => resolveStaticSouvenirVideoSrc(`images/souvenirs/${cat.prefix}vid${n}`).then(src => ({ src, n }))))
      ]);
      if (myToken !== staticSouvenirRenderToken) return; // a newer tab click superseded this one
      allPhotos = extraResults.concat(photoResults).filter(r => r.src);
      allVideos = videoResults.filter(r => r.src);
      staticSouvenirCache.set(cat.id, { photos: allPhotos, videos: allVideos });
    }

    // Hidden state can change without a reload, so this filter always runs fresh
    // even when the underlying existence-check results come from the cache.
    const hidden = loadHiddenStaticSouvenirs();
    const presentPhotos = allPhotos.filter(r => !hidden.includes(r.src));
    const presentVideos = allVideos.filter(r => !hidden.includes(r.src));
    // Both photos and videos are selectable for the WhatsApp share flow, so this
    // covers "is there anything at all to share" — .share-photo (see below) is the
    // shared "selectable media" class applied to both photo and video tiles.
    staticSouvenirSrcs = presentPhotos.map(r => r.src).concat(presentVideos.map(r => r.src));

    const shareBtn = document.getElementById('staticSouvenirShareBtn');
    if (shareBtn) shareBtn.style.display = staticSouvenirSrcs.length ? 'inline-block' : 'none';

    if (!presentPhotos.length && !presentVideos.length) {
      grid.innerHTML = `<p class="souvenir-empty">${t('souvenirs_static_empty')}</p>`;
      updateStaticShareUI();
      return;
    }

    const downloadTitle = t('souvenir_download_title');
    const hideTitle = t('souvenir_hide_title');
    const photoTiles = presentPhotos.map(r => `
      <div class="gallery-item share-photo" data-src="${r.src}">
        <img src="${r.src}" alt="Souvenir ${r.n}">
        <a class="souvenir-download-btn" href="${r.src}" download title="${downloadTitle}" aria-label="${downloadTitle}">⬇</a>
        <button type="button" class="souvenir-hide-btn" title="${hideTitle}" aria-label="${hideTitle}">✕</button>
        <span class="share-check">✓</span>
      </div>
    `).join('');
    const videoTiles = presentVideos.map(r => `
      <div class="gallery-item video-tile share-photo" data-src="${r.src}">
        <video src="${r.src}#t=0.1" muted preload="metadata" playsinline></video>
        <a class="souvenir-download-btn" href="${r.src}" download title="${downloadTitle}" aria-label="${downloadTitle}">⬇</a>
        <button type="button" class="souvenir-hide-btn" title="${hideTitle}" aria-label="${hideTitle}">✕</button>
        <span class="video-play-icon">▶</span>
        <span class="share-check">✓</span>
      </div>
    `).join('');
    grid.innerHTML = photoTiles + videoTiles;
    grid.classList.toggle('selecting', staticShareMode);

    grid.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        if (staticShareMode) {
          item.classList.toggle('selected');
          updateStaticShareUI();
          return;
        }
        if (item.classList.contains('video-tile')) {
          openVideoLightbox(item.dataset.src, item);
        } else {
          openImageLightbox(item.dataset.src, item);
        }
      });
    });
    grid.querySelectorAll('.souvenir-download-btn').forEach(btn => {
      btn.addEventListener('click', e => e.stopPropagation());
    });
    grid.querySelectorAll('.souvenir-hide-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        if (!confirm(t('confirm_hide_souvenir'))) return;
        hideStaticSouvenir(btn.closest('.gallery-item').dataset.src);
        renderStaticSouvenirs();
      });
    });
  }

  function initStaticSouvenirTabs() {
    const tabs = document.getElementById('staticSouvenirTabs');
    if (!tabs) return;
    tabs.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.dataset.cat === activeStaticSouvenirCat) return;
        tabs.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeStaticSouvenirCat = btn.dataset.cat;
        toggleStaticShareMode(true);
        renderStaticSouvenirs();
      });
    });
  }

  function toggleStaticShareMode(forceOff) {
    const grid = document.getElementById('staticSouvenirGrid');
    staticShareMode = forceOff ? false : !staticShareMode;
    grid.classList.toggle('selecting', staticShareMode);
    if (!staticShareMode) {
      grid.querySelectorAll('.share-photo.selected').forEach(el => el.classList.remove('selected'));
    }
    updateStaticShareUI();
  }

  function updateStaticShareUI() {
    const btn = document.getElementById('staticSouvenirShareBtn');
    const cancelBtn = document.getElementById('staticShareCancelBtn');
    if (!btn || !cancelBtn) return;
    if (!staticShareMode) {
      btn.textContent = t('souvenirs_static_share_btn');
      cancelBtn.style.display = 'none';
      return;
    }
    const count = document.querySelectorAll('#staticSouvenirGrid .share-photo.selected').length;
    btn.textContent = t('share_send_btn', { count });
    cancelBtn.style.display = 'inline-block';
  }

  function initStaticSouvenirShare() {
    const btn = document.getElementById('staticSouvenirShareBtn');
    const cancelBtn = document.getElementById('staticShareCancelBtn');
    if (!btn || !cancelBtn) return;
    btn.addEventListener('click', () => {
      if (!staticShareMode) {
        if (!staticSouvenirSrcs.length) { alert(t('souvenir_no_media_alert')); return; }
        toggleStaticShareMode();
        return;
      }
      const selected = Array.from(document.querySelectorAll('#staticSouvenirGrid .share-photo.selected')).map(el => el.dataset.src);
      if (!selected.length) { alert(t('souvenir_select_media_alert')); return; }
      const cat = STATIC_SOUVENIR_CATEGORIES.find(c => c.id === activeStaticSouvenirCat) || STATIC_SOUVENIR_CATEGORIES[0];
      sharePhotosViaWhatsApp(selected, t(cat.labelKey));
      toggleStaticShareMode(true);
    });
    cancelBtn.addEventListener('click', () => toggleStaticShareMode(true));
  }

  function openImageLightbox(src, sourceEl) {
    document.getElementById('lightboxTitle').textContent = '';
    document.getElementById('lightboxDesc').textContent = '';
    document.getElementById('lightboxMedia').innerHTML = `<img src="${src}" alt="">`;
    setLightboxDownload(src);
    document.getElementById('lightbox').classList.add('open');
    animateLightboxFrom(sourceEl);
  }

  function openVideoLightbox(src, sourceEl) {
    document.getElementById('lightboxTitle').textContent = '';
    document.getElementById('lightboxDesc').textContent = '';
    document.getElementById('lightboxMedia').innerHTML = `<video src="${src}" controls autoplay playsinline></video>`;
    setLightboxDownload(src);
    document.getElementById('lightbox').classList.add('open');
    animateLightboxFrom(sourceEl);
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

  const activeShareCats = new Set();

  function toggleCatShareMode(catId, forceOff) {
    const on = forceOff ? false : !activeShareCats.has(catId);
    if (on) activeShareCats.add(catId); else activeShareCats.delete(catId);
    updateCatShareUI(catId);
  }

  function updateCatShareUI(catId) {
    const card = document.querySelector(`.souvenir-category[data-catid="${catId}"]`);
    if (!card) return;
    const on = activeShareCats.has(catId);
    card.classList.toggle('selecting', on);
    const shareBtn = card.querySelector('.cat-share');
    const cancelBtn = card.querySelector('.cat-share-cancel');
    const hint = card.querySelector('.cat-share-hint');
    if (!on) {
      card.querySelectorAll('.souvenir-photo.selected').forEach(el => el.classList.remove('selected'));
      shareBtn.textContent = t('souvenirs_static_share_btn');
      cancelBtn.style.display = 'none';
      if (hint) hint.style.display = 'none';
      return;
    }
    const count = card.querySelectorAll('.souvenir-photo.selected').length;
    shareBtn.textContent = count ? t('share_send_btn', { count }) : t('souvenirs_static_share_btn');
    cancelBtn.style.display = 'inline-block';
    if (hint) hint.style.display = 'block';
  }

  function renderSouvenirs() {
    const list = loadSouvenirs();
    const grid = document.getElementById('souvenirGrid');
    if (!list.length) {
      grid.innerHTML = `<p class="souvenir-empty">${t('souvenir_empty')}</p>`;
      return;
    }

    grid.innerHTML = list.map(cat => {
      const on = activeShareCats.has(cat.id);
      return `
      <div class="souvenir-category${on ? ' selecting' : ''}" data-catid="${cat.id}">
        <div class="souvenir-cat-header">
          <h4>${cat.name}</h4>
          <button type="button" class="icon-btn cat-delete" data-cat="${cat.id}" title="${t('delete_category_title')}">🗑</button>
        </div>
        <div class="share-toolbar cat-share-toolbar">
          <button type="button" class="btn-primary whatsapp-share-btn cat-share" data-cat="${cat.id}">${t('souvenirs_static_share_btn')}</button>
          <button type="button" class="btn-ghost cat-share-cancel" data-cat="${cat.id}" style="display:${on ? 'inline-block' : 'none'};">${t('share_cancel_btn')}</button>
        </div>
        <p class="share-tap-hint cat-share-hint" style="display:${on ? 'block' : 'none'};">${t('share_tap_hint')}</p>
        <div class="souvenir-photos">
          ${cat.photos.map(p => `
            <div class="souvenir-photo" data-src="${p.src}">
              <img src="${p.src}" alt="${p.caption || cat.name}">
              <button type="button" class="photo-delete" data-cat="${cat.id}" data-photo="${p.id}" title="${t('delete_photo_title')}">&times;</button>
              <span class="share-check">✓</span>
              ${p.caption ? `<div class="cap">${p.caption}</div>` : ''}
            </div>
          `).join('')}
          <label class="souvenir-add-tile">
            <span>${t('souvenir_add_photo')}</span>
            <input type="file" accept="image/*" hidden class="souvenir-file-input" data-cat="${cat.id}">
          </label>
        </div>
      </div>
    `;
    }).join('');

    grid.querySelectorAll('.cat-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!confirm(t('confirm_delete_category'))) return;
        activeShareCats.delete(btn.dataset.cat);
        saveSouvenirs(loadSouvenirs().filter(c => c.id !== btn.dataset.cat));
        renderSouvenirs();
      });
    });
    grid.querySelectorAll('.cat-share').forEach(btn => {
      btn.addEventListener('click', () => {
        const catId = btn.dataset.cat;
        const cat = loadSouvenirs().find(c => c.id === catId);
        if (!cat) return;
        if (!activeShareCats.has(catId)) {
          if (!cat.photos.length) { alert(t('share_no_photos_alert')); return; }
          toggleCatShareMode(catId);
          return;
        }
        const card = btn.closest('.souvenir-category');
        const selected = Array.from(card.querySelectorAll('.souvenir-photo.selected')).map(el => el.dataset.src);
        if (!selected.length) { alert(t('share_select_photos_alert')); return; }
        sharePhotosViaWhatsApp(selected, cat.name);
        toggleCatShareMode(catId, true);
      });
    });
    grid.querySelectorAll('.cat-share-cancel').forEach(btn => {
      btn.addEventListener('click', () => toggleCatShareMode(btn.dataset.cat, true));
    });
    grid.querySelectorAll('.souvenir-photo').forEach(tile => {
      tile.addEventListener('click', (e) => {
        const card = tile.closest('.souvenir-category');
        const catId = card.dataset.catid;
        if (!activeShareCats.has(catId)) return;
        if (e.target.closest('.photo-delete')) return;
        tile.classList.toggle('selected');
        updateCatShareUI(catId);
      });
    });
    grid.querySelectorAll('.photo-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
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
      sisterWeeks: formatDuration(state.sisterFirst + state.sisterFinal),
      youWeeks: formatDuration(state.withYou),
      AbdullahWeeks: formatDuration(state.Abdullah)
    });
  }

  /* ===================== NAV ===================== */
  function initNav() {
    document.getElementById('navToggle').addEventListener('click', () => {
      document.getElementById('navLinks').classList.toggle('open');
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('open');
        const id = a.getAttribute('href').slice(1);
        openCollapsibleSection(id);
      });
    });
    document.getElementById('navBrandHome').addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ===================== COLLAPSIBLE SECTIONS ===================== */
  function handleSectionOpened(sec) {
    if (!sec) return;
    if (sec.id === 'tripmap') {
      if (!tripMapInstance) initTripMapIfNeeded();
      else setTimeout(() => tripMapInstance.invalidateSize(), 200);
    }
  }

  function openCollapsibleSection(id) {
    const target = document.getElementById(id);
    if (!target || !target.classList.contains('collapsible-section')) return;
    document.querySelectorAll('.collapsible-section').forEach(s => s.classList.remove('open'));
    target.classList.add('open');
    handleSectionOpened(target);
  }

  function initCollapsibleSections() {
    document.querySelectorAll('.collapsible-section').forEach(sec => {
      sec.querySelector('.section-header').addEventListener('click', () => {
        const wasOpen = sec.classList.contains('open');
        document.querySelectorAll('.collapsible-section').forEach(s => s.classList.remove('open'));
        if (!wasOpen) {
          sec.classList.add('open');
          handleSectionOpened(sec);
        }
      });
    });
  }

  /* ===================== THEME TOGGLE ===================== */
  const THEME_KEY = 'europeTripTheme';
  function applyThemeIcon() {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    btn.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
  }
  function initThemeToggle() {
    applyThemeIcon();
    document.getElementById('themeToggle').addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem(THEME_KEY, 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem(THEME_KEY, 'dark');
      }
      applyThemeIcon();
    });
  }

  /* ===================== TRIP PROGRESS BAR ===================== */
  function renderTripProgress() {
    const fill = document.getElementById('tripProgressFill');
    if (!fill) return;
    const pct = Math.min(100, Math.max(0, ((Date.now() - TRIP_START) / (TRIP_END - TRIP_START)) * 100));
    fill.style.width = pct + '%';
  }

  /* ===================== CURRENT LOCATION BANNER ===================== */
  function renderCurrentLocationBanner() {
    const el = document.getElementById('currentLocationBanner');
    if (!el) return;
    const now = new Date();
    if (now < TRIP_START) {
      const days = Math.ceil((TRIP_START - now) / 86400000);
      el.textContent = t('current_location_before', { days, date: fmtShort(TRIP_START) });
      el.style.display = 'inline-block';
    } else if (now > TRIP_END) {
      el.textContent = t('current_location_after');
      el.style.display = 'inline-block';
    } else {
      const { legs } = computeSchedule();
      const leg = legForDate(legs, now);
      if (leg) {
        el.textContent = t('current_location_now', { name: leg.name });
        el.style.display = 'inline-block';
      } else {
        el.style.display = 'none';
      }
    }
  }

  /* ===================== WHATSAPP SHARE ===================== */
  function updateWhatsappShareLink() {
    const btn = document.getElementById('shareWhatsappBtn');
    if (!btn) return;
    const text = t('share_whatsapp_text') + ' ' + SITE_URL;
    btn.href = 'https://wa.me/?text=' + encodeURIComponent(text);
  }

  const LEG_EMOJI = { sisterFirst: '🏠', withYou: '🗼', Abdullah: '🏡', sisterFinal: '🏠' };

  function buildPlannerShareText() {
    const { legs } = computeSchedule();
    const legLines = legs.map(leg =>
      (LEG_EMOJI[leg.key] || '📍') + ' ' + leg.name + ': ' + fmtShort(leg.start) + ' → ' + fmtShort(leg.end)
    ).join('\n');
    return [
      t('planner_share_header'),
      '',
      t('planner_share_landing', { date: fmtShort(TRIP_START) }),
      legLines,
      t('planner_share_return', { date: fmtShort(TRIP_END) }),
      '',
      t('planner_share_cta'),
      '',
      '🔗 ' + SITE_URL
    ].join('\n');
  }

  // Track 0 is the original song — its autoplay-on-load behavior and i18n
  // title key are unchanged from the single-song player, just the file path
  // moved into the Music/ folder along with the rest.
  const PLAYLIST = [
    { src: 'Music/NadiyaChale.mp3', titleKey: 'music_song_name' },
    { src: 'Music/LaDerniereDanse.mp3', title: 'La Dernière Danse' },
    { src: 'Music/GutGenug.mp3', title: 'Gut Genug' },
    { src: 'Music/HawaHawa.mp3', title: 'Hawa Hawa' }
  ];
  let musicCurrentIdx = 0;

  function trackTitle(track) {
    return track.titleKey ? t(track.titleKey) : track.title;
  }

  function renderMusicPlayerTexts() {
    const nameEl = document.getElementById('musicSongName');
    if (nameEl) nameEl.textContent = trackTitle(PLAYLIST[musicCurrentIdx]);
    document.querySelectorAll('#musicPlaylistList .playlist-track-title').forEach((el, i) => {
      if (PLAYLIST[i]) el.textContent = trackTitle(PLAYLIST[i]);
    });
  }

  function initMusicPlayer() {
    const audio = document.getElementById('bgAudio');
    const toggleBtn = document.getElementById('musicToggleBtn');
    const toggleIcon = document.getElementById('musicToggleIcon');
    const seek = document.getElementById('musicSeek');
    const curEl = document.getElementById('musicCurrentTime');
    const durEl = document.getElementById('musicDuration');
    const prevBtn = document.getElementById('musicPrevBtn');
    const nextBtn = document.getElementById('musicNextBtn');
    const queueToggle = document.getElementById('musicQueueToggle');
    const queuePanel = document.getElementById('musicQueuePanel');
    const shuffleBtn = document.getElementById('musicShuffleBtn');
    const modeOnce = document.getElementById('modeOnce');
    const modeLoop = document.getElementById('modeLoop');
    const listEl = document.getElementById('musicPlaylistList');
    if (!audio || !toggleBtn) return;

    let repeatMode = 'once';
    let shuffleOn = false;
    let shuffleOrder = [];
    let shufflePos = 0;

    function fmtTime(sec) {
      if (!isFinite(sec) || sec < 0) sec = 0;
      const m = Math.floor(sec / 60);
      const s = Math.floor(sec % 60);
      return m + ':' + String(s).padStart(2, '0');
    }

    function setPlayingUI(isPlaying) {
      toggleIcon.textContent = isPlaying ? '⏸️' : '▶️';
      toggleBtn.classList.toggle('playing', isPlaying);
      toggleBtn.setAttribute('aria-label', isPlaying ? t('music_pause') : t('music_play'));
    }

    function shuffleArray(arr) {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = a[i]; a[i] = a[j]; a[j] = tmp;
      }
      return a;
    }

    // anchorIdx: keep this track first (used when shuffle is switched on
    // mid-playback), or null for a fresh reshuffle of the whole playlist.
    function buildShuffleOrder(anchorIdx) {
      const all = PLAYLIST.map((_, i) => i);
      if (anchorIdx === null || anchorIdx === undefined) {
        shuffleOrder = shuffleArray(all);
      } else {
        shuffleOrder = [anchorIdx, ...shuffleArray(all.filter(i => i !== anchorIdx))];
      }
      shufflePos = 0;
    }

    function renderPlaylistUI() {
      if (!listEl) return;
      listEl.innerHTML = '';
      PLAYLIST.forEach((track, i) => {
        const li = document.createElement('li');
        li.className = 'playlist-track' + (i === musicCurrentIdx ? ' active' : '');
        const num = document.createElement('span');
        num.className = 'playlist-track-num';
        num.textContent = String(i + 1);
        const title = document.createElement('span');
        title.className = 'playlist-track-title';
        title.textContent = trackTitle(track);
        const icon = document.createElement('span');
        icon.className = 'playlist-track-playing-icon';
        icon.textContent = '🔊';
        li.append(num, title, icon);
        li.addEventListener('click', () => loadTrack(i, true));
        listEl.appendChild(li);
      });
    }

    function loadTrack(idx, autoplay) {
      musicCurrentIdx = idx;
      audio.src = PLAYLIST[idx].src;
      seek.value = 0;
      curEl.textContent = '0:00';
      durEl.textContent = '0:00';
      renderPlaylistUI();
      renderMusicPlayerTexts();
      if (shuffleOn) {
        const pos = shuffleOrder.indexOf(idx);
        if (pos >= 0) shufflePos = pos;
      }
      if (autoplay) audio.play().catch(() => {});
    }

    // Manual prev/next: always cycles through the list, independent of
    // the once/loop setting (that setting only governs auto-advance).
    function manualStep(direction) {
      if (shuffleOn) {
        shufflePos = (shufflePos + direction + shuffleOrder.length) % shuffleOrder.length;
        loadTrack(shuffleOrder[shufflePos], true);
      } else {
        const idx = (musicCurrentIdx + direction + PLAYLIST.length) % PLAYLIST.length;
        loadTrack(idx, true);
      }
    }

    // Auto-advance when a track finishes: respects once (stop at the end)
    // vs loop (wrap around and keep going), in either sequential or shuffle order.
    function autoAdvance() {
      if (shuffleOn) {
        shufflePos++;
        if (shufflePos >= shuffleOrder.length) {
          if (repeatMode === 'loop') {
            buildShuffleOrder(null);
            loadTrack(shuffleOrder[0], true);
          }
          return;
        }
        loadTrack(shuffleOrder[shufflePos], true);
      } else {
        const idx = musicCurrentIdx + 1;
        if (idx >= PLAYLIST.length) {
          if (repeatMode === 'loop') loadTrack(0, true);
          return;
        }
        loadTrack(idx, true);
      }
    }

    audio.addEventListener('loadedmetadata', () => {
      durEl.textContent = fmtTime(audio.duration);
      seek.max = audio.duration || 100;
    });
    audio.addEventListener('timeupdate', () => {
      if (!seek.matches(':active')) seek.value = audio.currentTime;
      curEl.textContent = fmtTime(audio.currentTime);
    });
    audio.addEventListener('play', () => setPlayingUI(true));
    audio.addEventListener('pause', () => setPlayingUI(false));
    audio.addEventListener('ended', autoAdvance);

    toggleBtn.addEventListener('click', () => {
      if (audio.paused) audio.play().catch(() => {}); else audio.pause();
    });

    seek.addEventListener('input', () => {
      audio.currentTime = Number(seek.value);
      curEl.textContent = fmtTime(audio.currentTime);
    });

    if (prevBtn) prevBtn.addEventListener('click', () => manualStep(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => manualStep(1));

    if (queueToggle && queuePanel) {
      queueToggle.addEventListener('click', () => {
        const isOpen = queuePanel.classList.toggle('open');
        queueToggle.classList.toggle('open', isOpen);
        queueToggle.setAttribute('aria-expanded', String(isOpen));
      });
    }

    if (shuffleBtn) {
      shuffleBtn.addEventListener('click', () => {
        shuffleOn = !shuffleOn;
        shuffleBtn.classList.toggle('active', shuffleOn);
        shuffleBtn.setAttribute('aria-pressed', String(shuffleOn));
        if (shuffleOn) buildShuffleOrder(musicCurrentIdx);
      });
    }
    if (modeOnce) modeOnce.addEventListener('change', () => { if (modeOnce.checked) repeatMode = 'once'; });
    if (modeLoop) modeLoop.addEventListener('change', () => { if (modeLoop.checked) repeatMode = 'loop'; });

    // Start each visit on a random song, drawn from a full shuffle of the
    // playlist, so it's not always Nadiya Chale first — and since a shuffle
    // order still contains every track exactly once, "Once" mode still plays
    // through all four (just in a different order) instead of stopping early.
    buildShuffleOrder(null);
    shuffleOn = true;
    if (shuffleBtn) {
      shuffleBtn.classList.add('active');
      shuffleBtn.setAttribute('aria-pressed', 'true');
    }
    loadTrack(shuffleOrder[0], false);

    // Attempt autoplay; browsers that block unmuted autoplay will reject the
    // promise, so fall back to starting on the very first user interaction.
    const playAttempt = audio.play();
    if (playAttempt && typeof playAttempt.catch === 'function') {
      playAttempt.catch(() => {
        const resume = () => {
          audio.play().catch(() => {});
          document.removeEventListener('click', resume);
          document.removeEventListener('keydown', resume);
          document.removeEventListener('touchstart', resume);
        };
        document.addEventListener('click', resume, { once: true });
        document.addEventListener('keydown', resume, { once: true });
        document.addEventListener('touchstart', resume, { once: true });
      });
    }
  }

  function initPlannerShare() {
    const btn = document.getElementById('plannerShareBtn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      window.open('https://wa.me/?text=' + encodeURIComponent(buildPlannerShareText()), '_blank');
    });
  }

  async function sharePhotosViaWhatsApp(photoSrcs, titleText) {
    if (!photoSrcs || !photoSrcs.length) { alert(t('share_no_photos_alert')); return; }
    try {
      const files = await Promise.all(photoSrcs.map(async (src, i) => {
        const blob = await (await fetch(src)).blob();
        // Prefer the real file extension (works for photos and videos alike) —
        // only fall back to guessing from the MIME type if the src has none.
        const extMatch = src.match(/\.([a-zA-Z0-9]+)(?:[?#]|$)/);
        const ext = extMatch ? extMatch[1].toLowerCase() : (blob.type.includes('png') ? 'png' : 'jpg');
        return new File([blob], `souvenir-${i + 1}.${ext}`, { type: blob.type });
      }));
      if (navigator.canShare && navigator.canShare({ files })) {
        await navigator.share({ files, title: titleText, text: titleText });
        return;
      }
    } catch (e) {
      if (e && e.name === 'AbortError') return; // user cancelled the native share sheet
    }
    alert(t('share_fallback_alert'));
    window.open('https://wa.me/?text=' + encodeURIComponent(titleText + ' — ' + SITE_URL), '_blank');
  }

  /* ===================== CONFETTI ===================== */
  function triggerConfetti() {
    const container = document.getElementById('confettiContainer');
    if (!container) return;
    const colors = ['#1E88E5', '#FF5A5F', '#FFC93C', '#7C4DFF', '#2ECC71'];
    for (let i = 0; i < 120; i++) {
      const piece = document.createElement('span');
      piece.className = 'confetti-piece';
      piece.style.left = (Math.random() * 100) + '%';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDuration = (2.2 + Math.random() * 1.8) + 's';
      piece.style.animationDelay = (Math.random() * 0.4) + 's';
      piece.style.transform = 'rotate(' + Math.floor(Math.random() * 360) + 'deg)';
      container.appendChild(piece);
      piece.addEventListener('animationend', () => piece.remove());
    }
  }

  /* ===================== TRIP MAP (Leaflet, lazy-init on first open) ===================== */
  let tripMapInstance = null;
  function initTripMapIfNeeded() {
    if (tripMapInstance || typeof L === 'undefined') return;
    const mapEl = document.getElementById('mapContainer');
    if (!mapEl) return;
    const map = L.map('mapContainer').setView([49.3, 4.2], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors', maxZoom: 18
    }).addTo(map);

    const cityStops = [
      { lat: 50.7374, lng: 7.0982, color: COLORS.sisterFirst, get name() { return t('leg_sisterFirst_name'); } },
      { lat: 49.2686, lng: 2.5495, color: COLORS.withYou, get name() { return t('leg_withYou_name'); } },
      { lat: 48.7758, lng: 9.1829, color: COLORS.Abdullah, get name() { return t('leg_Abdullah_name'); } }
    ];
    cityStops.forEach(c => {
      L.circleMarker([c.lat, c.lng], { radius: 11, color: c.color, fillColor: c.color, fillOpacity: 0.85, weight: 2 })
        .addTo(map)
        .bindPopup('<span class="map-popup-name">' + c.name + '</span>');
    });

    const routeLatLngs = cityStops.map(c => [c.lat, c.lng]);
    routeLatLngs.push(routeLatLngs[0]); // back to Bonn
    const routeLine = L.polyline(routeLatLngs, { color: '#1E88E5', weight: 3, opacity: 0.8 }).addTo(map);
    if (motionOk()) {
      setTimeout(() => {
        const path = routeLine.getElement && routeLine.getElement();
        if (!path || typeof path.getTotalLength !== 'function') return;
        const length = path.getTotalLength();
        path.style.strokeDasharray = length + ' ' + length;
        path.style.strokeDashoffset = length;
        path.getBoundingClientRect();
        path.style.transition = 'stroke-dashoffset 1.6s ease';
        requestAnimationFrame(() => { path.style.strokeDashoffset = '0'; });
        path.addEventListener('transitionend', function onEnd() {
          path.style.transition = '';
          path.style.strokeDasharray = '8 8';
          path.style.strokeDashoffset = '0';
          path.removeEventListener('transitionend', onEnd);
        });
      }, 300);
    } else {
      routeLine.setStyle({ dashArray: '8 8' });
    }

    getAllPlaces().forEach(p => {
      if (typeof p.lat !== 'number' || typeof p.lng !== 'number') return;
      const tr = placeText(p);
      L.marker([p.lat, p.lng]).addTo(map)
        .bindPopup('<span class="map-popup-name">' + p.emoji + ' ' + tr.name + '</span><br><span class="map-popup-desc">' + tr.desc + '</span>');
    });

    tripMapInstance = map;
    setTimeout(() => map.invalidateSize(), 250);
  }

  /* ===================== PACKING CHECKLIST (this device only) ===================== */
  const PACKING_KEY = 'europeTripPacking';
  const DEFAULT_PACKING_ITEMS = ['passport', 'medications', 'charger', 'shoes', 'clothing', 'camera', 'sunglasses', 'bottle', 'snacks', 'umbrella'];

  function loadPacking() {
    let data;
    try { data = JSON.parse(localStorage.getItem(PACKING_KEY)); } catch (e) { data = null; }
    if (!Array.isArray(data)) {
      data = DEFAULT_PACKING_ITEMS.map(id => ({ id, key: 'packing_item_' + id, checked: false }));
      savePacking(data);
    }
    return data;
  }
  function savePacking(list) {
    localStorage.setItem(PACKING_KEY, JSON.stringify(list));
  }

  function renderPacking() {
    const list = loadPacking();
    const container = document.getElementById('packingList');
    if (!container) return;
    container.innerHTML = list.map(item => `
      <div class="packing-item${item.checked ? ' checked' : ''}" data-id="${item.id}">
        <input type="checkbox" ${item.checked ? 'checked' : ''}>
        <span class="label">${item.key ? t(item.key) : item.label}</span>
        <button type="button" class="packing-delete" title="${t('packing_delete_title')}">🗑</button>
      </div>
    `).join('');

    container.querySelectorAll('.packing-item').forEach(row => {
      const id = row.dataset.id;
      row.querySelector('input[type="checkbox"]').addEventListener('change', (e) => {
        const data = loadPacking();
        const wasAllChecked = data.length > 0 && data.every(i => i.checked);
        const item = data.find(i => i.id === id);
        if (item) item.checked = e.target.checked;
        savePacking(data);
        renderPacking();
        const nowAllChecked = data.length > 0 && data.every(i => i.checked);
        if (!wasAllChecked && nowAllChecked) triggerConfetti();
      });
      row.querySelector('.packing-delete').addEventListener('click', () => {
        savePacking(loadPacking().filter(i => i.id !== id));
        renderPacking();
      });
    });
  }

  function initPackingChecklist() {
    document.getElementById('packingAddBtn').addEventListener('click', () => {
      const input = document.getElementById('packingAddInput');
      const label = input.value.trim();
      if (!label) return;
      const data = loadPacking();
      data.push({ id: uid('pk'), label, checked: false });
      savePacking(data);
      input.value = '';
      renderPacking();
    });
    document.getElementById('packingAddInput').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') document.getElementById('packingAddBtn').click();
    });
  }

  /* ===================== RENDER ALL ===================== */
  function renderAll() {
    renderPlanner();
    renderTimeline();
    renderCalendar();
    renderItinerary();
    renderFooter();
    renderCurrentLocationBanner();
    renderTripProgress();
  }

  function renderEverything() {
    renderRouteStrip();
    renderFilterBar();
    renderPlaceGrid();
    renderGallery();
    renderApproval();
    renderStaticSouvenirs();
    renderSouvenirs();
    renderPacking();
    renderAll();
    renderMusicPlayerTexts();
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyStaticTranslations();
    initLangSwitch();
    renderRouteStrip();
    initNav();
    initCollapsibleSections();
    initThemeToggle();
    initPlanner();
    initUnitToggle();
    initPlannerShare();
    initMusicPlayer();
    renderFilterBar();
    renderPlaceGrid();
    initGalleryTabs();
    renderGallery();
    initLightbox();
    initImageEditModal();
    initAddPlaceModal();
    renderApproval();
    initStaticSouvenirTabs();
    initStaticSouvenirShare();
    renderStaticSouvenirs();
    initSouvenirs();
    renderSouvenirs();
    initBackup();
    initPackingChecklist();
    renderPacking();
    renderAll();

    renderCountdown();
    setInterval(() => {
      renderCountdown();
      renderTripProgress();
      renderCurrentLocationBanner();
    }, 1000);
  });
})();
