FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "test#{n}@mail.com" }
    password { 'password' }

    trait :confirmed do
      confirmed_at { Time.zone.now }
    end
  end
end