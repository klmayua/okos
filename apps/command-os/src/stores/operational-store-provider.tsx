'use client';

import React from 'react';

import { AuthStore } from './auth-store';
import { GovernanceStore } from './governance-store';
import { IncidentStore } from './incident-store';
import { InitiativesStore } from './initiatives-store';
import { ModerationStore } from './moderation-store';
import { NotificationStore } from './notification-store';
import { RealtimeStore } from './realtime-store';
import { SessionStore } from './session-store';
import { SyncStore } from './sync-store';
import { TreasuryStore } from './treasury-store';
import { VerificationStore } from './verification-store';
import { VolunteerStore } from './volunteer-store';

export function OperationalStoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthStore.Provider>
      <SessionStore.Provider>
        <InitiativesStore.Provider>
          <TreasuryStore.Provider>
            <VerificationStore.Provider>
              <IncidentStore.Provider>
                <ModerationStore.Provider>
                  <VolunteerStore.Provider>
                    <GovernanceStore.Provider>
                      <SyncStore.Provider>
                        <NotificationStore.Provider>
                          <RealtimeStore.Provider>
                            {children}
                          </RealtimeStore.Provider>
                        </NotificationStore.Provider>
                      </SyncStore.Provider>
                    </GovernanceStore.Provider>
                  </VolunteerStore.Provider>
                </ModerationStore.Provider>
              </IncidentStore.Provider>
            </VerificationStore.Provider>
          </TreasuryStore.Provider>
        </InitiativesStore.Provider>
      </SessionStore.Provider>
    </AuthStore.Provider>
  );
}
