import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Utility } from 'src/app/utility';

export interface DragDropFile {
  name: string,
  type: string,
  size: number,
  extension: string,
  date: number
}

@Component({
  selector: 'adm-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss'],
})
export class DragDropComponent implements OnInit {
  private acceptFileExtensionArray: string[] = [];
  private fileNameList: string[] = [];

  protected items: DragDropFile[] = [];
  protected getIcon = Utility.instance().getIcon;

  @ViewChild('fileInput') fileInput!: ElementRef;

  @Input() title: string;
  @Input() icon: string;
  @Input() dateFormat = 'DD MMM, YYYY';
  @Input() fileMaxSize = 20971520; //bites - (max 20mb)
  @Input() acceptFileExtensions: string;
  @Output() attached = new EventEmitter<DragDropFile[]>();

  isDragEnter = false;

  ngOnInit() {
    const cleanedFileExtensions = this.acceptFileExtensions.replaceAll('.', '').replaceAll(' ', '');
    this.acceptFileExtensionArray = cleanedFileExtensions.split(',');
  }

  onFilesSelect(event: any) {
    const files = event.target.files
    const sortedFiles = this.sortFiles(files);
    if (!sortedFiles) return;

    this.items = sortedFiles;
    this.fileNameList = sortedFiles.map(f => f.name);
    this.fileInput.nativeElement.value = '';
    this.attached.emit(sortedFiles);
  }

  onDragEnter(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragEnter = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragEnter = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragEnter = false;

    const files = event.dataTransfer?.files;
    const sortedFiles = this.sortFiles(files);
    if (!sortedFiles) return;

    this.items = sortedFiles;
    this.fileNameList = sortedFiles.map(f => f.name);
    this.fileInput.nativeElement.value = '';
    this.attached.emit(sortedFiles);
  }

  openFileDialog() {
    this.fileInput.nativeElement.click();
  }

  removeAttachment(name: string) {
    var fileIndex = this.items.findIndex(f => f.name === name);
    this.fileNameList = this.fileNameList.filter(f => f !== name);
    setTimeout(() => this.items.splice(fileIndex, 1), 200);
  }

  isAttachmentVisible(name: string) {
    return this.fileNameList.includes(name);
  }

  convertBytesToMb(sizeKb: number) {
    const megabytes = sizeKb / 1024 / 1024;
    return Math.round(megabytes * 100) / 100;
  }

  private sortFiles(files: any) {
    if (!files || !files.length) return null;

    var sortedFiles: DragDropFile[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (!file) continue;

      const lastDotIndex = file.name.lastIndexOf('.');
      const fileName = file.name.substring(0, lastDotIndex);
      const fileExtension = file.name.substring(lastDotIndex + 1);

      if (this.fileMaxSize >= file.size && fileExtension && this.acceptFileExtensionArray.includes(fileExtension.toLowerCase())) {
        sortedFiles.push({
          name: fileName,
          type: file.type,
          size: file.size,
          extension: fileExtension,
          date: file.lastModified
        });
      }
    }

    return sortedFiles.sort((a, b) => a.extension.localeCompare(b.extension));
  }
}
