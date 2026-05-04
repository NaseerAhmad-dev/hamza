import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PackagesService } from '../../core/services/packages.service';
import { JobsService } from '../../core/services/jobs.service';
import { PackageCardComponent } from '../../shared/card/package-card.component';
import { JobCardComponent } from '../../shared/card/job-card.component';
import { Package } from '../../core/models/package.model';
import { Job } from '../../core/models/job.model';

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
  private pkgSvc = inject(PackagesService);
  private jobSvc = inject(JobsService);

  featuredUmrah = signal<Package[]>([]);
  featuredHajj  = signal<Package[]>([]);
  featuredJobs  = signal<Job[]>([]);

  stats = [
    { value: '1,200+', label: 'Umrah Pilgrims' },
    { value: '500+',   label: 'Hajjis Served'  },
    { value: '300+',   label: 'Jobs Placed'    },
    { value: '15+',    label: 'Years Experience'},
  ];

  features = [
    { icon: '🛡', title: 'Government Approved',  desc: 'Licensed by Ministry of Religious Affairs and IATA certified for international travel.' },
    { icon: '✈', title: 'Direct Flights',        desc: 'Premium airline partnerships ensure comfortable, direct flights to Jeddah & Madinah.' },
    { icon: '🏨', title: '5-Star Hotels',         desc: 'Carefully selected accommodations steps away from Masjid al-Haram and Masjid an-Nabawi.' },
    { icon: '👨‍✈️', title: 'Expert Guides',       desc: 'Experienced Islamic scholars accompany every group for spiritual guidance.' },
    { icon: '📞', title: '24/7 Support',          desc: 'Round-the-clock customer service before, during, and after your journey.' },
    { icon: '💳', title: 'Easy Payment',          desc: 'Flexible installment plans and multiple payment options for your convenience.' },
  ];

  testimonials = [
    { name: 'Mohammad Amin', loc: 'Srinagar, Kashmir', initial: 'M', text: 'Alhamdulillah, the Umrah journey was beautifully organized. Every detail was taken care of, from flights to hotel. The guide at Masjid al-Haram was exceptional and truly spiritual.' },
    { name: 'Aisha Wazir', loc: 'Sopore, Kashmir', initial: 'A', text: 'My first Hajj was a dream come true! Hamza Tour and Travels team made everything seamless. The VIP accommodation was comfortable, ziyarat well-planned, and their support was unmatched throughout.' },
    { name: 'Ghulam Hassan', loc: 'Anantnag, Kashmir', initial: 'G', text: 'I was placed as a healthcare professional in Saudi Arabia through Hamza Tour and Travels. Their professionalism, visa guidance, and post-placement support exceeded all expectations. Highly recommended!' },
    { name: 'Zainab Begum', loc: 'Baramulla, Kashmir', initial: 'Z', text: 'Second Umrah with Hamza Tour and Travels! The Economy package offers exceptional value. Everything from flight timing to hotel cleanliness was perfect. Their team truly cares about pilgrims.' },
    { name: 'Rajesh Kumar', loc: 'Delhi, India', initial: 'R', text: 'My family of 6 did the family Umrah package. The arrangements were flawless, guides were knowledgeable, and the team handled all our questions with patience. JazakAllah khair!' },
    { name: 'Priya Sharma', loc: 'Mumbai, India', initial: 'P', text: 'Got placed as a teacher in UAE through Hamza Tour and Travels. The entire recruitment process was transparent and professional. They provided orientation, visa support, and continue to assist with settling in.' },
  ];

  // Duplicate for infinite scroll
  get allTestimonials() { return [...this.testimonials, ...this.testimonials]; }

  ngOnInit(): void {
    this.pkgSvc.getFeaturedPackages('umrah').subscribe(p => this.featuredUmrah.set(p));
    this.pkgSvc.getFeaturedPackages('hajj').subscribe(p => this.featuredHajj.set(p));
    this.jobSvc.getFeaturedJobs().subscribe(j => this.featuredJobs.set(j));
  }

  openApply(job: Job): void {
    console.log('Apply for:', job.title);
    // Open modal — implement via a ModalService or Angular CDK Dialog
  }
}
