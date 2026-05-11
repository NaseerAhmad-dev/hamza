import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PackagesService } from '../../core/services/packages.service';
import { JobsService } from '../../core/services/jobs.service';
import { YoutubeService, YouTubeVideo } from '../../core/services/youtube.service';
import { GoogleReviewsService, GoogleReview } from '../../core/services/google-reviews.service';
import { PackageCardComponent } from '../../shared/card/package-card.component';
import { JobCardComponent } from '../../shared/card/job-card.component';
import { Package } from '../../core/models/package.model';
import { Job } from '../../core/models/job.model';
import { STUDY_PROGRAMS, StudyProgram } from '../../core/data/study-programs.data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, PackageCardComponent, JobCardComponent],
  templateUrl: './home.component.html',
  styles: [`
    .section-eyebrow {
      font-size: 12px; font-weight: 700; letter-spacing: 3px;
      text-transform: uppercase; color: #065F46;
      display: flex; align-items: center; justify-content: center;
      gap: 8px; margin-bottom: 12px;
    }
    .section-eyebrow::before, .section-eyebrow::after {
      content: ''; width: 30px; height: 1px;
      background: #D4AF37; opacity: 0.6;
    }
  `],
})
export class HomeComponent implements OnInit {
  private pkgSvc     = inject(PackagesService);
  private jobSvc     = inject(JobsService);
  private ytSvc      = inject(YoutubeService);
  private reviewsSvc = inject(GoogleReviewsService);
  private sanitizer  = inject(DomSanitizer);

  featuredUmrah  = signal<Package[]>([]);
  featuredJobs   = signal<Job[]>([]);
  youtubeVideos  = signal<YouTubeVideo[]>([]);
  googleReviews  = signal<GoogleReview[]>([]);
  activeVideoId  = signal<string | null>(null);

  safeEmbedUrl = computed((): SafeResourceUrl | null => {
    const id = this.activeVideoId();
    if (!id) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`
    );
  });

  featuredStudyPrograms: StudyProgram[] = STUDY_PROGRAMS.filter(p => p.featured);

  stats = [
    { value: '1,200+', label: 'Umrah Pilgrims'   },
    { value: '500+',   label: 'Students Placed'  },
    { value: '300+',   label: 'Jobs Placed'       },
    { value: '15+',    label: 'Years Experience'  },
  ];

  features = [
    { icon: '🛡', title: 'Government Approved',  desc: 'Licensed by Ministry of Religious Affairs and IATA certified for international travel.' },
    { icon: '✈', title: 'Direct Flights',        desc: 'Premium airline partnerships ensure comfortable, direct flights to Jeddah & Madinah.' },
    { icon: '🏨', title: '5-Star Hotels',         desc: 'Carefully selected accommodations steps away from Masjid al-Haram and Masjid an-Nabawi.' },
    { icon: '👨‍✈️', title: 'Expert Guides',       desc: 'Experienced Islamic scholars accompany every group for spiritual guidance.' },
    { icon: '📞', title: '24/7 Support',          desc: 'Round-the-clock customer service before, during, and after your journey.' },
    { icon: '💳', title: 'Easy Payment',          desc: 'Flexible installment plans and multiple payment options for your convenience.' },
  ];

  ngOnInit(): void {
    this.pkgSvc.getFeaturedPackages('umrah').subscribe(p => this.featuredUmrah.set(p));
    this.jobSvc.getFeaturedJobs().subscribe(j => this.featuredJobs.set(j));
    this.ytSvc.fetchChannelVideos(6).subscribe(v => this.youtubeVideos.set(v));
    this.reviewsSvc.fetchReviews().subscribe(r => this.googleReviews.set(r));
  }

  displayReviews(): GoogleReview[] {
    const live = this.googleReviews();
    return live.length ? live : this.fallbackTestimonials;
  }

  readonly fallbackTestimonials: GoogleReview[] = [
    { authorName: 'Mohammad Amin',  initial: 'M', rating: 5, relativeTime: '2 months ago', authorPhoto: '', text: 'Alhamdulillah, the Umrah journey was beautifully organized. Every detail was taken care of, from flights to hotel. The guide at Masjid al-Haram was exceptional and truly spiritual.' },
    { authorName: 'Aisha Wazir',    initial: 'A', rating: 5, relativeTime: '3 months ago', authorPhoto: '', text: 'My family Umrah trip was a dream come true! Hamza Tour and Travels made everything seamless. The VIP accommodation was comfortable and their support was unmatched throughout.' },
    { authorName: 'Ghulam Hassan',  initial: 'G', rating: 5, relativeTime: '4 months ago', authorPhoto: '', text: 'I was placed as a healthcare professional abroad through Hamza Tour and Travels. Their professionalism, visa guidance, and post-placement support exceeded all expectations.' },
    { authorName: 'Zainab Begum',   initial: 'Z', rating: 5, relativeTime: '1 month ago',  authorPhoto: '', text: 'Second Umrah with Hamza Tour and Travels! The Economy package offers exceptional value. Everything from flight timing to hotel cleanliness was perfect.' },
    { authorName: 'Rajesh Kumar',   initial: 'R', rating: 5, relativeTime: '5 months ago', authorPhoto: '', text: 'My family of 6 did the family Umrah package. The arrangements were flawless, guides were knowledgeable, and the team handled all our questions with patience.' },
    { authorName: 'Priya Sharma',   initial: 'P', rating: 5, relativeTime: '6 months ago', authorPhoto: '', text: 'Got placed as a teacher in UAE through Hamza Tour and Travels. The entire recruitment process was transparent and professional. They provided orientation and visa support.' },
  ];

  openApply(job: Job): void {
    console.log('Apply for:', job.title);
    // Open modal — implement via a ModalService or Angular CDK Dialog
  }
}
