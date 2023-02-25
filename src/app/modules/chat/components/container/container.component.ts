import { Component } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent {
  public messages = [
    {
      type: 'others',
      text: 'حالا این دفعه بذار کارو شروع کنیم بعد از ظهر گفته میره سرتیفیکیت با خودش میاره 🙃',
      time: '۰۹:۱۳',
    },
    {
      type: 'self',
      text: 'طبق آخرین مصوبه ورود هرگونه ماشین آلات سنگین بدون سرتیفیکیت به کارگاه ممنوع است ☺️',
      time: '۰۹:۱۳',
      delivery_status: 1,
    },
    {
      sender: {
        name: 'احمد توکلیان',
        avatar: 'assets/icons/chat/avatar.svg',
      },
      type: 'others',
      text: 'مهندس اون بنده خدا سرتیفیکیت آوردش برات ایمیل کردم',
      time: '۱۹:۰۳',
    },
    {
      sender: {
        name: 'احمد توکلیان',
        avatar: 'assets/icons/chat/avatar.svg',
      },
      type: 'others',
      text: 'حالا این دفعه بذار کارو شروع کنیم بعد از ظهر گفته میره سرتیفیکیت با خودش میاره 🙃',
      time: '۰۹:۱۳',
    },
    {
      sender: {
        name: 'احمد توکلیان',
        avatar: 'assets/icons/chat/avatar.svg',
      },
      type: 'others',
      text: 'حالا این دفعه بذار کارو شروع کنیم بعد از ظهر گفته میره سرتیفیکیت با خودش میاره 🙃',
      time: '۰۹:۱۳',
    },
    {
      type: 'self',
      text: 'حالا این دفعه بذار کارو شروع کنیم بعد از ظهر گفته میره سرتیفیکیت با خودش میاره 🙃',
      time: '۰۹:۱۳',
    },
    {
      type: 'self',
      text: ' سرتیفیکیت با خودش میاره 🙃',
      time: '۰۹:۱۳',
      delivery_status: 1,
    },
    {
      type: 'self',
      text: 'حالا این دفعه بذار کارو شروع کنیم بعد از ظهر گفته میره سرتیفیکیت با خودش میاره 🙃',
      time: '۰۹:۱۳',
      delivery_status: 1,
    },
    {
      type: 'self',
      text: 'حالا این دفعه بذار کارو شروع کنیم بعد از ظهر گفته میره سرتیفیکیت با خودش میاره 🙃',
      time: '۰۹:۱۳',
    },
    {
      type: 'self',
      text: 'حالا این دفعه بذار کارو شروع کنیم بعد از ظهر گفته میره سرتیفیکیت با خودش میاره 🙃',
      time: '۰۹:۱۳',
    },
  ];
}
