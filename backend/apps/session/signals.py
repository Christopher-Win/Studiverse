from django.db.models.signals import m2m_changed
from django.dispatch import receiver
from .models import Session

@receiver(m2m_changed, sender=Session.participants.through)
def update_session_occupancy(sender, instance, **kwargs):
    instance.session_occupancy = instance.participants.count()
    instance.save()
