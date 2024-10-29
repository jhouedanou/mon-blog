---
title: "How to Clone Ubuntu Without Losing Your Data and Soul"
image: "/images/articles/pingui.jpg"
createdAt: "29-10-2024"
---

# 🚀 How to Clone Ubuntu Without Losing Your Data and Soul

When your computer's SSD running Ubuntu starts coughing and "insufficient disk space" messages become your most frequent notification, it's time to take action. In my case, upgrading to a 256 GB SSD will give me (and my HP Pro X2) some breathing room.

## 🎯 What You'll Need

- A new SSD (in my case, 256 GB)
- Your current working Ubuntu installation
- A bootable USB drive (just in case)
- 30 minutes of your time (plus coffee time)

## 🛠 Step-by-Step Procedure

### 1. Disk Identification

First crucial step, identifying who's who in our happy system:
_sudo fdisk -l_
In my case with the HP Pro X2, the source disk is /dev/sda and the new SSD is /dev/sdb.

### 2. The Cloning Script

Create a clone-ubuntu.sh file:

```
#!/bin/bash
# Root privilege check
if [ "$EUID" -ne 0 ]; then
  echo "This script must be run as root (use sudo)"
  exit 1
fi

# Configure these variables according to your disks
SOURCE_DISK="/dev/sda"
DESTINATION_DISK="/dev/sdb"

# Safety checks
if [ ! -b "$SOURCE_DISK" ] || [ ! -b "$DESTINATION_DISK" ]; then
    echo "Error: One of the disks doesn't exist"
    exit 1
fi

echo "WARNING: This operation will erase all data on $DESTINATION_DISK"
echo "Source disk: $SOURCE_DISK"
echo "Destination disk: $DESTINATION_DISK"
read -p "Are you sure you want to continue? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi

# Cloning
echo "Cloning in progress... Perfect time for coffee ☕"
dd if=$SOURCE_DISK of=$DESTINATION_DISK bs=64K conv=noerror,sync status=progress

# Partition extension
echo "Extending partition..."
parted $DESTINATION_DISK resizepart 2 100%
resize2fs "${DESTINATION_DISK}2"
echo "Cloning complete! 🎉"
```

### 3. Execution

sudo bash clone-ubuntu.sh

### 4. Verification

Once cloning is complete:
sudo fdisk -l
Verify that the new partition is using all available space.

## 🎯 Important Points

- Check the letters corresponding to each hard drive;
- Backup: Even though I trust my script, I still made a backup beforehand. Better safe than sorry!
- Disk name verification: I'll say it again.\
  This is THE part where you can't afford to make a mistake
- Patience: Cloning can take some time, depending on your data size
